import React, { createContext, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import listingsApi from "../api/listings";
import useApi from "../hooks/useApi";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [itemsAddress, setItemsAddress] = useState([
    {
      id: 1,
      country: {
        label: "Uzbekistan",
        value: 1,
      },
      city: {
        label: "Tashkent",
        value: 1,
      },
      district: {
        label: "Shaikantkour",
        value: 1,
      },
      street: "Besyogach street",
      house: "28",
      flatNo: "21",
      contactname: "a b c d",
      postalcode: "123453535",
      mobile: "+998977616654",
      inCart: true,
    },
    {
      id: 2,
      country: {
        label: "Uzbekistan",
        value: 1,
      },
      city: {
        label: "Bukhara",
        value: 2,
      },
      district: {
        label: "Younusbad",
        value: 2,
      },
      street: "ring road street",
      house: "45",
      flatNo: "1",
      contactname: "d f g h h",
      postalcode: "45353555",
      mobile: "+998977616654",
      inCart: false,
    },
  ]);
  const [cardData, setCardData] = useState([
    {
      id: 1,
      cardNum: "4761640026883566",
      inCart: true,
      month: 2,
      year: 22,
      cardType: "Uz Card",
    },
    {
      id: 2,
      cardNum: "4761640026883588",
      inCart: false,
      month: 4,
      year: 21,
      cardType: "Visa",
    },
  ]);
  const [cardNumber, setCardNumber] = useState([]);
  const [addressCard, setCard] = useState([]);
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState("");
  const [tax, setTax] = useState("");
  const [delivery, setDelivery] = useState("");
  const [total, setTotal] = useState("");
  const [search, setSearch] = useState("");
  const [searchedDataSource, setSearchedDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const getListingsApi = useApi(listingsApi.getListings);

  useEffect(() => {
    getListingsApi.request().then((response) => {
      setMasterDataSource(response.data);
    });
  }, []);
  useEffect(() => {
    getData();
  }, [masterDataSource]);
  useEffect(() => {
    addTotals();
  }, [cart]);
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = filteredDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearchedDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setSearchedDataSource(filteredDataSource);
      setFilteredDataSource(filteredDataSource);
      setSearch(text);
    }
  };

  getItem = (id) => {
    const product = masterDataSource.find((item) => item._id === id);
    return product;
  };

  useEffect(() => {
    if (cart.length > 0) {
      let tempProducts = masterDataSource;
      const productss = tempProducts.map(
        (obj) => cart.find((o) => o._id === obj._id) || obj
      );
      setFilteredDataSource([...productss]);
      setSearchedDataSource([...productss]);
    }
  }, [cart]);

  const addToCart = async (id) => {
    const value = await AsyncStorage.getItem("@storage_Key");
    const item = JSON.parse(value);

    if (item !== null) {
      const product = getItem(id);
      product.color = "green";
      product.inCart = true;
      product.count = 1;
      const price = product.price;
      product.total = price;
      setCart((cart) => [...cart, product]);
    } else {
      const product = getItem(id);
      product.color = "green";
      product.count = 1;
      product.inCart = true;
      const price = product.price;
      product.total = price;
      setCart((cart) => [...cart, product]);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      const item = JSON.parse(value);

      let tempProducts = [...masterDataSource];
      if (item !== null) {
        setCart(item, addTotals());
      } else {
        setCart([]);
      }
      const products = tempProducts.map(
        (obj) => cart.find((o) => o._id === obj._id) || obj
      );
      setFilteredDataSource(products);
      setSearchedDataSource(products);
    } catch (e) {
      console.log("e", e);
    }
  };
  const clearStorage = async () => {
    try {
      setCart([], addTotals());
      await AsyncStorage.clear();
      setPayment("");
      setTotal("");
      setTax("");
      setDelivery("");
      alert("Storage successfully cleared!");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
    getListingsApi.request().then((response) => {
      setFilteredDataSource(response.data);
      setMasterDataSource(response.data);
    });
  };
  const increment = (id) => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find((item) => item._id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;
    setCart([...tempCart]);
    addTotals();
  };
  const decrement = (id) => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find((item) => item._id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;

    if (product.count === 0) {
      handleDelete(id);
    } else {
      product.total = product.count * product.price;
      setCart([...tempCart]);
      addTotals();
    }
  };

  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  }

  const groupedShop = groupBy(cart, "fromUserId");

  const arrShopTotalPrice = [];
  Object.keys(groupedShop).forEach((shopId) => {
    let shopsubTotal = 0;
    let deliveryCharges = 0;
    groupedShop[shopId].forEach((item) => {
      shopsubTotal += item.total;
    });
    arrShopTotalPrice.push({ shopId, shopsubTotal, deliveryCharges });
  });

  const addTotals = () => {
    let subTotal = 0;
    cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal;
    const finalPayment = total;
    const payment = parseFloat(finalPayment.toFixed(2));
    setPayment(payment);
    setTotal(total);
    setTax(tax);
    setDelivery(delivery);
  };

  const handleDelete = async (id) => {
    let tempProducts = [...searchedDataSource];
    let Cart = [...cart];

    const tempCart = Cart.filter((item) => item._id !== id);
    setCart([...tempCart], addTotals());
    await AsyncStorage.setItem("@storage_Key", JSON.stringify(tempCart));

    const index = masterDataSource.indexOf(getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.count = 0;
    removedProduct.total = 0;
    removedProduct.color = "black";
    removedProduct.inCart = false;

    const products = tempProducts.map(
      (obj) => tempCart.find((o) => o._id === obj._id) || obj
    );
    setFilteredDataSource([...products]);
    setSearchedDataSource([...products]);
  };

  useEffect(() => {
    chooseCard();
  }, []);

  const chooseCard = (id) => {
    var newArr = itemsAddress.map((d) => {
      if (d.id === id) {
        d.inCart = true;
        setCard(d);
        return d;
      }
      {
        d.inCart = false;
        return d;
      }
    });
    setItemsAddress(newArr);
  };

  useEffect(() => {
    chooseCardNumber();
  }, []);

  const chooseCardNumber = (id) => {
    var newArr = cardData.map((d) => {
      if (d.id === id) {
        d.inCart = true;
        setCardNumber(d);
        return d;
      }
      {
        d.inCart = false;
        return d;
      }
    });
    setCardData(newArr);
  };

  return (
    <CartContext.Provider
      value={{
        increment,
        decrement,
        addTotals,
        payment,
        total,
        tax,
        delivery,
        searchedDataSource,
        cart,
        addToCart,
        clearStorage,
        handleDelete,
        searchFilterFunction,
        filteredDataSource,
        search,
        getListingsApi,
        addressCard,
        itemsAddress,
        cardData,
        chooseCardNumber,
        chooseCard,
        cardNumber,
        groupedShop,
        arrShopTotalPrice,
        masterDataSource,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
