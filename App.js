import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";
import CartContextProvider from "./app/utility/cartContext";
import { LocaleContextProvider } from "./app/locales/index.js";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
    return () => {
      user.remove();
    };
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );

  return (
    <LocaleContextProvider>
      <CartContextProvider>
        <AuthContext.Provider value={{ user, setUser }}>
          <OfflineNotice />
          <NavigationContainer ref={navigationRef} theme={navigationTheme}>
            {user ? <AppNavigator user={user} /> : <AuthNavigator />}
          </NavigationContainer>
        </AuthContext.Provider>
      </CartContextProvider>
    </LocaleContextProvider>
  );
}
