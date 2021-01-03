import React, { useContext, useEffect } from "react";
import { FlatList, AsyncStorage } from "react-native";
import Screen from "../components/Screen";
import { CartContext } from "../utility/cartContext";
import Button from "../components/Button";
import ActivityIndicator from "../components/ActivityIndicator";

import {
  ListItemwithout,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";

function StoreScreen({ navigation }) {
  const { clearStorage, handleDelete, cart } = useContext(CartContext);

  useEffect(() => {
    saveData();
  });
  const saveData = async () => {
    await AsyncStorage.setItem("@storage_Key", JSON.stringify(cart));
  };

  return (
    <>
      <ActivityIndicator visible={cart.loading} />
      <Screen>
        <Button
          title="clear store"
          color="secondary"
          onPress={() => clearStorage()}
        />
        <FlatList
          data={cart}
          keyExtractor={(listing, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItemwithout
              image={{ uri: item.hospitalImage[0] }}
              title={item.title}
              subTitle={"Сток : " + item.qty + " № "}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item._id)} />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </Screen>
    </>
  );
}

export default StoreScreen;
