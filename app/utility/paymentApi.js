/*
"One-time account" is a type of account that has a fixed amount,
and can be paid once. For example, an order in an online store,
a ticket to the cinema, or a one-time service.

"Savings account" is a type of account that you can pay unlimited
number of times. This type of account implies a long-term financial relationship with
the payer, and the presence of a balance in the supplier's system. For example, an internet provider
mobile operator, wallet, and other services with a personal balance of the payer
in the vendor app.

This example shows a common case for processing payment transactions for "Disposable invoices".
This case is suitable for online shopping, ticket sales, reservations,
and other services where a single financial relationship is implied
between the payer and the supplier.


We agree that the Order (account.order) will act as an Account,
and it can assume the following states:

0 - The order is free, it can change its amount, and can be paid
1 - The order is frozen and is awaiting payment completion
    With this order status, it is impossible to change it.
2 - The order has been paid. In this state, the order can still be canceled.
3 - The order is delivered and handed over to the client.
    In this state, the order can no longer be canceled.
*/

var http = require("http");
var PAYCOM_PASSWORD = "3305e3bab097f420a62ced01";

//Processing the HTTP request
http
  .createServer(function (request, response) {
    //check the HTTP method,
    if (request.method !== "POST") {
      //if it differs from POST, return error -32300
      return sendResponse(RPCErrors.TransportError(), null);
    }

    //check the authorization of the request.
    if (!checkAuth(request.headers["authorization"])) {
      //if the request is authorized, we return the error -32504
      return sendResponse(RPCErrors.AccessDeniet(), null);
    }

    var id; //id of the RPC request

    //get POST Data
    request.on("data", function (data) {
      try {
        //parse the request
        data = JSON.parse(data.toString());
        id = data.id;
      } catch (e) {
        //in case of an error while parsing data,
        //return error -32700
        return sendResponse(RPCErrors.ParseError(), null);
      }

      //Checking if the requested method exists
      if (!Biling[data.method]) {
        //If the requested method is not supported,
        //returning error -32601
        return sendResponse(RPCErrors.MethodNotFound(), null);
      }

      try {
        //We call the requested method and return the result to the client.
        var result = Biling[data.method](data.params);
        sendResponse(null, result);
      } catch (error) {
        //если метод выбросил ошибку то возвращаем клиенту ошибку
        sendResponse(error, null);
      }
    });

    //return the result of processing the request
    function sendResponse(error, result) {
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
      });
      response.end(
        JSON.stringify({
          jsonrpc: "2.0",
          error: error || undefined,
          result: result || undefined,
          id: id,
        })
      );
    }
  })
  .listen(1388, "127.0.0.1");

//checking the authorization header
function checkAuth(auth) {
  return (
    auth && // check if the header exists
    (auth = auth.trim().split(/ +/)) && // split the title into 2 parts
    auth[0] === "Basic" &&
    auth[1] && // check if the header format is correct
    (auth = new Buffer(auth[1], "base64").toString("utf-8")) && // decode from base64
    (auth = auth.trim().split(/ *: */)) && // split header into login password
    auth[0] === "Paycom" && // check login
    auth[1] === PAYCOM_PASSWORD
  ); // check the password
}

var Orders = {}; // collection with orders
var Transactions = {}; // collection with transactions
var TransactionsGUI = 1; // transaction counter

var Biling = {
  //The main purpose of the method is to check the availability of an order for payment,
  //and check the transaction amount with the order amount
  //you can also make your own necessary business rules
  CheckPerformTransaction: function (params) {
    //looking for an order in the database
    var order = Orders[params.account.order];
    if (!order) {
      //if the order does not exist, return the error -31050 .. -31099
      throw BilingErrors.OrderNotFound();
    }
    //check if the order is available for payment
    if (order.state !== 0) {
      //If the order has already been paid or is awaiting payment completion,
      //return error -31050 .. -31099
      throw BilingErrors.OrderAvailable();
    }
    //we compare the order amount with the transaction amount
    if (order.amount * 100 !== params.amount) {
      /// if the order amount and the transaction amount do not match,
      //return error -31001
      throw BilingErrors.IncorrectAmount();
    }
    // Next, you can add the necessary business logic for
    // checks for permission to create a transaction
    return {
      allow: true,
    };
  },
  CreateTransaction: function (params) {
    // trying to find a transaction in the database
    var transaction = Transactions[params.id];
    if (transaction) {
      // if such a transaction already exists in the database
      // check the status of the transaction,
      if (transaction.state !== 1) {
        // if the transaction is paid (state == 2) or canceled (state == -1 | -2),
        // return error -31008
        throw BilingErrors.UnexpectedTransactionState();
      }

      // if the transaction is in the initial state (state == 1)
      // return its result and end the method execution
      return {
        state: transaction.state,
        create_time: transaction.create_time,
        transaction: transaction.transaction.toString(),
      };
    }

    // if there are no transactions in the database
    try {
      // check if it is possible to pay for the order by calling the CheckPerformTransaction method inside
      Biling.CheckPerformTransaction(params);
    } catch (error) {
      // if the CheckPerformTransaction method returned an error,
      // then we forward it to the top and terminate the execution of the CreateTransaction method
      throw error;
    }

    // if the order is free and you can pay for it
    // create a transaction and add it to the database
    transaction = {
      id: params.id,
      time: params.time,
      state: 1, // set the initial state of the transaction
      create_time: Date.now(), // mark the time when the transaction was created
      perform_time: 0,
      cancel_time: 0,
      transaction: TransactionsGUI++,
      order: params.account.order,
      reason: null,
    };

    Transactions[params.id] = transaction;

    // block the order so that it cannot be changed or paid with another transaction
    var order = Orders[transaction.order];
    order.state = 1;

    // return the result
    return {
      state: transaction.state,
      create_time: transaction.create_time,
      transaction: transaction.transaction.toString(),
    };
  },
  PerformTransaction: function (params) {
    // trying to find a transaction in the database
    var transaction = Transactions[params.id];
    if (!transaction) {
      // if the transaction is not found, return the error -31003
      throw BilingErrors.TransactionNotFound();
    }

    // if the transaction is in the initial state (state == 1)
    if (transaction.state === 1) {
      // mark the order as paid
      var order = Orders[transaction.order];
      order.state = 2;

      // do something useful

      // mark the transaction completed
      transaction.state = 2; // set the transaction state to completed (state = 2)
      transaction.perform_time = Date.now(); // mark the end of the transaction
    }

    // if the transaction is completed
    // return a successful result
    if (transaction.state === 2) {
      return {
        state: transaction.state,
        perform_time: transaction.perform_time,
        transaction: transaction.transaction.toString(),
      };
    }

    // if the transaction is canceled
    // return error -31008
    throw BilingErrors.UnexpectedTransactionState();
  },
  CancelTransaction: function (params) {
    // trying to find a transaction in the database
    var transaction = Transactions[params.id];
    if (!transaction) {
      // if the transaction is not found, return the error -31003
      throw BilingErrors.TransactionNotFound();
    }

    // Find the order for which the transaction was made
    var order = Orders[transaction.order];

    // if the transaction is not yet completed
    if (transaction.state === 1) {
      // cancel the transaction
      transaction.state = -1; // mark the transaction as canceled (state = -1)
      transaction.reason = params.reason; // set the reason for cancellation
      transaction.cancel_time = Date.now(); // set the transaction cancellation time

      // release the order so that we can pay for it with another transaction
      order.state = 0;
    }

    // if the transaction is already completed
    // ATTENTION: This part of the logic is purely individual for each business,
    // here is a general case
    if (transaction.state === 2) {
      // if the order has already been completed in full and cannot be canceled
      if (order.state === 3) {
        // return error -31007
        throw BilingErrors.OrderNotСanceled();

        // if business processes allow canceling an order at any time,
        // this part of the logic can be omitted
      }

      // if the order is still possible to cancel
      if (order.state === 2) {
        transaction.state = -2; // mark the transaction canceled (state = -2)
        transaction.reason = params.reason; // set the reason for cancellation
        transaction.cancel_time = Date.now(); // set the transaction cancellation time

        // cancel and block the order
        order.state = -2;

        // if the business process allows you to pay for the order again after canceling
        // then you can return the order to its initial state,
        // so that it can be paid again with another transaction
        //order.state = 0;
      }
    }

    // return the result of canceling the transaction
    return {
      state: transaction.state,
      cancel_time: transaction.cancel_time,
      transaction: transaction.transaction.toString(),
    };
  },
  CheckTransaction: function (params, callback) {
    // trying to find a transaction in the database
    var transaction = Transactions[params.id];
    if (!transaction) {
      // if the transaction is not found, return the error -31003
      return BilingErrors.TransactionNotFound();
    }

    // if a transaction is found, then return all its parameters
    return {
      state: transaction.state,
      create_time: transaction.create_time,
      perform_time: transaction.perform_time,
      cancel_time: transaction.cancel_time,
      transaction: transaction.transaction.toString(),
      reason: transaction.reason,
    };
  },
};

var RPCErrors = {
  TransportError: function () {
    return {
      code: -32300,
      message: "Transport Error",
      data: null,
    };
  },

  AccessDeniet: function () {
    return {
      code: -32504,
      message: "AccessDeniet",
      data: null,
    };
  },

  ParseError: function () {
    return {
      code: -32700,
      message: "Parse Error",
      data: null,
    };
  },

  MethodNotFound: function () {
    return {
      code: -32601,
      message: "Method not found",
      data: null,
    };
  },
};

var BilingErrors = {
  TransactionNotFound: function () {
    return {
      code: -31003,
      message: "Transaction not found",
      data: null,
    };
  },

  UnexpectedTransactionState: function () {
    return {
      code: -31008,
      message: {
        ru: "Transaction status does not allow the operation to be performed",
      },
      data: null,
    };
  },

  IncorrectAmount: function () {
    return {
      code: -31001,
      message: {
        ru: "Invalid order amount",
      },
      data: null,
    };
  },

  OrderNotFound: function () {
    return {
      code: -31050,
      message: {
        ru: "Order not found",
      },
      data: "order",
    };
  },

  OrderAvailable: function () {
    return {
      code: -31051,
      message: {
        ru:
          "Unable to perform operation. The order is awaiting payment or has been paid. ",
      },
      data: "order",
    };
  },

  OrderNotСanceled: function () {
    return {
      code: -31007,
      message: {
        ru: "The order is fully completed and cannot be canceled.",
      },
      data: null,
    };
  },
};
