import React, { useContext } from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import MessageDetailsScreen from "../screens/MessageDetailsScreen";
import FilterListingsScreen from "../screens/FilterListingsScreen";
import CartScreen from "../screens/CartScreen";
import PaymentScreen from "../screens/PaymentMethodScreen";
import CardListScreen from "../screens/CardListScreen";
import ShippingAddress from "../screens/ShippingAddressScreen";
import OrderConfirmation from "../screens/OrderConfirmation";
import AddressEditScreen from "../screens/UserProfileEditScreen";
import ShopProfileEditScreen from "../screens/ShopProfileEditScreen";
import ShippingAddressEditScreen from "../screens/ShippingAddressEditScreen";
import AddCardScreen from "../screens/AddCardScreen";
import OrderAccepted from "../screens/OrderAcceptedScreen";
import ShopProfileCard from "../screens/ShopProfileScreen";
import UserProfileCard from "../screens/UserProfileScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import cardVerificationScreen from "../screens/cardVerificationScreen";
import StatusScreen from "../screens/StatusScreen";
import { LocaleContext } from "../locales/index.js";
import routes from "./routes";

const Stack = createStackNavigator();

function FeedNavigator({ navigation }) {
  const { strings } = useContext(LocaleContext);
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Listings"
        options={{ headerShown: false }}
        component={ListingsScreen}
      />
      <Stack.Screen name="Корзина" component={CartScreen} />
      <Stack.Screen name="Аккаунт" component={AccountScreen} />
      <Stack.Screen name="Add Card" component={AddCardScreen} />
      <Stack.Screen name="ShopProfile" component={ShopProfileCard} />
      <Stack.Screen name="UserProfile" component={UserProfileCard} />
      <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
      <Stack.Screen name="MessageDetails" component={MessageDetailsScreen} />
      <Stack.Screen name="FilterListings" component={FilterListingsScreen} />
      <Stack.Screen name="Choose Payment Method" component={PaymentScreen} />
      <Stack.Screen
        name="Card Lists"
        component={CardListScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate(routes.ADDCARD)}
              title="Add Card"
              color="blue"
            />
          ),
        }}
      />
      <Stack.Screen
        name="CardVerification"
        options={{ headerShown: false }}
        component={cardVerificationScreen}
      />
      <Stack.Screen
        name="Shipping Address"
        component={ShippingAddress}
        options={{
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate(routes.SHIPPINGADDRESS)}
              title="Add New"
              color="blue"
            />
          ),
        }}
      />
      <Stack.Screen name="Order Confirmation" component={OrderConfirmation} />
      <Stack.Screen
        name="Order Accepted"
        options={{ headerShown: false }}
        component={OrderAccepted}
      />
      <Stack.Screen name="Address Form" component={AddressEditScreen} />
      <Stack.Screen name="ShopProfile Form" component={ShopProfileEditScreen} />
      <Stack.Screen
        name="ShippingAddress Form"
        component={ShippingAddressEditScreen}
      />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
      <Stack.Screen name="StatusScreen" component={StatusScreen} />
    </Stack.Navigator>
  );
}

export default FeedNavigator;
