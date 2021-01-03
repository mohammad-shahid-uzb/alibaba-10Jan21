import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import CategoryScreen from "../screens/CategoryScreen";
import ListingEditScreen from "../screens/ListingEditScreen";
import { LocaleContext } from "../locales/index.js";

const Tab = createBottomTabNavigator();

const AppNavigator = ({ user }) => {
  const { strings } = useContext(LocaleContext);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={strings.Home}
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={strings.Category}
        component={CategoryScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="menu" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name={strings.AddItems}
        component={ListingEditScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name={strings.MyProfile}
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
