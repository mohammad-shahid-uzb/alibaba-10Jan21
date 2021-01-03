import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import VerificationFormScreen from "../screens/VerificationFormScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import { LocaleContext } from "../locales/index.js";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const { strings } = useContext(LocaleContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={strings.Welcome}
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="регистр" component={RegisterScreen} />
      <Stack.Screen
        name="Verification"
        options={{ headerShown: false }}
        component={VerificationFormScreen}
      />
      <Stack.Screen
        name="Resetpassword"
        options={{ headerShown: false }}
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
