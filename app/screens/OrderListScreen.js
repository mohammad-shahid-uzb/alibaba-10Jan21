import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import { ListItemSeparator, OrderListItem } from "../components/lists";
import ordersApi from "../api/ordersApi";
import useAuth from "../auth/useAuth";
import getShopProfileApi from "../api/shopProfile";

function OrderListScreen({ navigation }) {
  const [orders, setOrders] = useState();
  const [shops, setShops] = useState();
  const getOrderApi = useApi(ordersApi.getOrder);

  const { user } = useAuth();

  useEffect(() => {
    loadOrders(user._id);
  }, [user]);

  const loadOrders = async (userId) => {
    const response = await getOrderApi.request(userId);
    setOrders(response.data);
  };

  useEffect(() => {
    loadShop();
  }, [orders]);

  const loadShop = async () => {
    const resultShop = await getShopProfileApi.getAllShops();
    setShops(resultShop.data);
  };

  return (
    <Screen>
      {user.isAdmin == true ? (
        <FlatList
          data={orders}
          keyExtractor={(listing, index) => index.toString()}
          renderItem={({ item }) => (
            <OrderListItem
              title={item.orderNumber}
              subTitle={item.amount}
              item={item}
              onPress={() =>
                navigation.navigate(routes.ORDERDETAILS, { item, shops })
              }
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(listing, index) => index.toString()}
          renderItem={({ item }) => (
            <OrderListItem
              title={item.orderNumber}
              subTitle={item.amount}
              item={item}
              onPress={() =>
                navigation.navigate(routes.ORDERDETAILS, { item, shops })
              }
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      )}
    </Screen>
  );
}

export default OrderListScreen;
