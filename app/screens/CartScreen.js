import React, { useContext, useEffect, useState } from "react";
import { Text, View, FlatList, Image, AsyncStorage } from "react-native";
import { CartContext } from "../utility/cartContext";
import Screen from "../components/Screen";
import { EvilIcons } from "@expo/vector-icons";
import Footer from "../components/Footer";
import { ListItemDeleteAction } from "../components/lists";
import ShopCartList from "../components/lists/shopCartList";
import { LocaleContext } from "../locales/index.js";

const CartScreen = ({ navigation }) => {
  const {
    cart,
    increment,
    decrement,
    payment,
    total,
    tax,
    delivery,
    clearStorage,
    handleDelete,
  } = useContext(CartContext);

  useEffect(() => {
    saveData();
  });
  const saveData = async () => {
    await AsyncStorage.setItem("@storage_Key", JSON.stringify(cart));
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
  const groupedShop = groupBy(cart, "fromUserName");
  const arrShopTotalPrice = [];
  Object.keys(groupedShop).forEach((shopName) => {
    let shopsubTotal = 0;
    let deliveryCharges = 15000;
    groupedShop[shopName].forEach((item) => {
      shopsubTotal += item.total;
    });
    arrShopTotalPrice.push({ shopName, shopsubTotal, deliveryCharges });
  });

  const [dataArr, setDataArr] = useState(groupedShop);

  const shopNumber = Object.keys(groupedShop).length;
  const { strings } = useContext(LocaleContext);

  return (
    <Screen style={styles.screen}>
      {/* <Header empty={clearStorage} /> */}
      <View style={{ flex: 3, flexDirection: "column" }}>
        {shopNumber > 0 ? (
          <FlatList
            data={Object.keys(dataArr)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item) => (
              <>
                <View style={styles.header}>
                  <EvilIcons name="credit-card" size={25} color="#147EFB" />
                  <Text style={styles.textheader}>{item.item}</Text>
                </View>
                <FlatList
                  data={groupedShop[item.item]}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <ShopCartList
                      item={item}
                      index={index}
                      cart={cart}
                      increment={increment}
                      decrement={decrement}
                      renderRightActions={() => (
                        <ListItemDeleteAction
                          onPress={() => handleDelete(item._id)}
                        />
                      )}
                    />
                  )}
                />
              </>
            )}
          />
        ) : (
          <Text style={{ textAlign: "center" }}>{strings.Empty}</Text>
        )}
      </View>
      <Footer
        empty={clearStorage}
        cart={cart}
        payment={payment}
        tax={tax}
        dcharges={delivery}
        total={total}
        navigation={navigation}
      />
    </Screen>
  );
};

const styles = {
  containerStyle: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    padding: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  lastItemStyle: {
    flexDirection: "row",
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  imageStyle: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  textStyle: {
    flex: 2,
    justifyContent: "center",
  },
  priceStyle: {
    backgroundColor: "#ddd",
    width: 60,
    alignItems: "center",
    marginTop: 3,
    borderRadius: 3,
  },
  counterStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  containterStyle: {
    flex: 4,
    backgroundColor: "#DCDCDC",
  },
  screen: {
    padding: 10,
  },
  textQty: {
    justifyContent: "center",
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  header: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f4c0ff",
    marginTop: 5,
    flexDirection: "row",
  },
  textheader: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 10,
  },
};

export default CartScreen;
