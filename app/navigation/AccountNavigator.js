import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MylistScreen from "../screens/MylistScreen";
import OrderListScreen from "../screens/OrderListScreen";
import { LocaleContext } from "../locales/index.js";

const Stack = createStackNavigator();

function AccountNavigator() {
  const { strings } = useContext(LocaleContext);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Аккаунт" component={AccountScreen} />
      <Stack.Screen name="Сообщения" component={MessagesScreen} />
      <Stack.Screen name="Мой список" component={MylistScreen} />
      <Stack.Screen name="мои заказы" component={OrderListScreen} />
    </Stack.Navigator>
  );
}

export default AccountNavigator;
