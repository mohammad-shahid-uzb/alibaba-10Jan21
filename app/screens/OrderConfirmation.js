import React, { useContext, useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import shopApi from "../api/shopProfile";
import colors from "../config/colors";
import Text from "../components/Text";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Tooltip } from "react-native-elements";
import ordersApi from "../api/ordersApi";
import { FontAwesome5 } from "@expo/vector-icons";
import { CartContext } from "../utility/cartContext";
import Icon from "react-native-vector-icons/Ionicons";
import { ListItemSeparator } from "../components/lists";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import ActivityIndicator from "../components/ActivityIndicator";
import { LocaleContext } from "../locales/index.js";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";

const OrderConfirmation = ({ navigation, route }) => {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const {
    cart,
    increment,
    decrement,
    total,
    payment,
    clearStorage,
  } = useContext(CartContext);
  const { user } = useAuth();

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

  const shopNumber = Object.keys(groupedShop).length;
  const arrShop = [];

  const delivery = 150;
  const totalDelivery = delivery * shopNumber;
  const finalPayment = totalDelivery + payment;

  Object.keys(groupedShop).forEach((shopId) => {
    const item = groupedShop[shopId].map((item) => ({
      id: item._id,
      count: item.count,
    }));
    let deliveryCharges = delivery;
    arrShop.push({ shopId, item, deliveryCharges });
  });
  const address = route.params.address;

  const add = JSON.stringify(address);
  const card = route.params.card;
  const paymentType = route.params.paymentType;

  const orderData = {
    userId: user._id,
    orderDetails: arrShop,
    deliveryAddress: add,
    paymentDetails: {
      method: paymentType,
      token: card.token,
    },
  };

  const [shops, setShops] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const rsp = await shopApi.getAllShops();
    setShops(rsp.data);
  };

  const saveOrdersApi = useApi(ordersApi.addOrders);
  const handleSubmit = async (orderData, navigation) => {
    setProgress(0);
    setUploadVisible(true);
    const data = await saveOrdersApi.request(orderData, (progress) =>
      setProgress(progress)
    );
    if (!data.ok) {
      setUploadVisible(false);
      return alert(
        "Не удалось сохранить объявление. Пожалуйста, попробуйте еще раз."
      );
    } else {
      clearStorage();
      navigation.navigate(routes.ORDERACCEPTED, { data, shops });
      return alert("Заказ успешно создан");
    }
  };

  const { strings } = useContext(LocaleContext);

  return (
    <Screen style={{ backgroundColor: colors.bgWhite }}>
      <ActivityIndicator visible={saveOrdersApi.loading} />
      <View style={styles.firstCard}>
        <Text style={styles.firstText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate(routes.SHIPPING)}>
        <View style={styles.fourthCard}>
          <View style={styles.containermd}>
            <View style={styles.icon}>
              <EvilIcons name="location" size={34} color="#147EFB" />
            </View>
          </View>
          {address ? (
            <View style={styles.containersd}>
              <Text style={styles.titleAddress}>route.params.address.name</Text>
              <Text style={styles.subTitleAddress}>
                House: address.house- {address.flatNo}
              </Text>
              <Text style={styles.subTitleAddress}>{address.street},</Text>
              <Text style={styles.subTitleAddress}>
                {address.district} {address.city}
              </Text>
              <Text style={styles.subTitleAddress}>Mob: address.mobile</Text>
            </View>
          ) : (
            <View style={styles.containersd}>
              <Text style={styles.titleAddress}>{strings.SelectAddress}</Text>
            </View>
          )}
          <MaterialCommunityIcons
            color={colors.medium}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableOpacity>

      {paymentType === "card" ? (
        <View style={styles.cardPayments}>
          <View style={styles.containermd}>
            <View style={styles.icon}>
              <FontAwesome5 name="amazon-pay" size={24} color="#147EFB" />
            </View>
          </View>
          <View style={styles.containersd}>
            <Text style={styles.titleAddress}>{route.params.card.number}</Text>
            <Text style={styles.subTitleAddress}>
              {route.params.card.expire}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.cardPayments}>
          <View style={styles.containermd}>
            <View style={styles.icon}>
              <FontAwesome5 name="amazon-pay" size={24} color="#147EFB" />
            </View>
          </View>
          <View style={styles.containersd}>
            <Text style={styles.titleAddress}>{strings.Cash}</Text>
          </View>
        </View>
      )}
      <View style={{ maxHeight: "20%", flexDirection: "column" }}>
        <View style={styles.cardItems}>
          <View style={styles.containercd}>
            <View style={styles.icon}>
              <Ionicons name="ios-cart" size={24} color="#147EFB" />
              <Text style={styles.subTitleAddress}>
                {strings.Item}: {cart.length}
              </Text>
            </View>
            {cart.length > 0 ? (
              <FlatList
                data={cart}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <ScrollView>
                    <View style={styles.cardItemsIn}>
                      <View
                        style={
                          index + 1 === cart.length
                            ? styles.lastItemStyle
                            : styles.containerStyle
                        }
                      >
                        <Image
                          source={{ uri: item.hospitalImage[0] }}
                          style={styles.imageStyle}
                        />
                        <View style={styles.textStyle}>
                          <View style={styles.priceStyle}>
                            <Text style={{ color: "#2e2f30", fontSize: 12 }}>
                              {item.price}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.counterStyle}>
                          <Icon.Button
                            name="ios-remove"
                            size={15}
                            color="#3e4444"
                            backgroundColor="#fff"
                            style={{
                              borderRadius: 10,
                              backgroundColor: "#deeaee",
                              height: 30,
                              width: 30,
                            }}
                            iconStyle={{ marginRight: 0 }}
                            onPress={() => decrement(item._id)}
                          />
                          <Text style={styles.textQty}>{item.count}</Text>
                          <Icon.Button
                            name="ios-add"
                            size={15}
                            color="#3e4444"
                            backgroundColor="#fff"
                            style={{
                              borderRadius: 10,
                              backgroundColor: "#deeaee",
                              height: 30,
                              width: 30,
                            }}
                            iconStyle={{ marginRight: 0 }}
                            onPress={() => increment(item._id)}
                          />
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                )}
              />
            ) : (
              <View style={styles.containersd}>
                <Text style={styles.titleAddress}>{strings.Empty}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.fifthCard}>
        <ListItemSeparator />
        <View style={styles.invcontainer}>
          <View style={{ marginRight: 10 }}>
            <FontAwesome5
              name="file-invoice-dollar"
              size={24}
              color="#147EFB"
            />
          </View>
          <Text style={styles.invoiceTextIcon}>{strings.Invoice}</Text>
        </View>
        <ListItemSeparator />
        <View style={styles.invcontainer}>
          <View style={styles.invoice}>
            <Text style={styles.invoicetitle}>{strings.paymentmethod}</Text>
          </View>
          {paymentType === "card" ? (
            <Text style={styles.invoiceText}>{route.params.paymentType}</Text>
          ) : (
            <Text style={styles.invoiceText}>{strings.Cash}</Text>
          )}
        </View>
        <ListItemSeparator />
        <View style={styles.invcontainer}>
          <View style={styles.invoice}>
            <Text style={styles.invoicetitle}>{strings.CardType}</Text>
          </View>
          <Text style={styles.invoiceText}>{route.params.card.type}</Text>
        </View>
        <ListItemSeparator />
        <View style={styles.invcontainer}>
          <View style={styles.invoice}>
            <Text style={styles.invoicetitle}>
              {strings.Shippingcost}-{shopNumber} {strings.shop}
            </Text>
          </View>
          <Text style={styles.invoiceText}>{delivery * shopNumber} UZS</Text>
        </View>
        <ListItemSeparator />
        <View style={styles.invcontainer}>
          <View style={styles.invoice}>
            <Text style={styles.invoicetitle}>{strings.ProductCost}</Text>
          </View>
          <Text style={styles.invoiceText}>{total} UZS</Text>
        </View>
        <ListItemSeparator />
        {paymentType === "visa" && (
          <View style={styles.invcontainer}>
            <View style={styles.invoice}>
              <Text style={styles.invoicetitle}>Bank CC Charges</Text>
            </View>
            <Text style={styles.invoiceText}>~3.63%</Text>
          </View>
        )}
        <ListItemSeparator />
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.buttonContainerStyle}>
          <View style={styles.closeButtonStyle}>
            <Text style={styles.title}>{strings.Payment}</Text>
            <Text style={styles.subTitle} numberOfLines={2}>
              UZS:{finalPayment}
            </Text>
          </View>
          {address ? (
            <TouchableOpacity
              onPress={() => handleSubmit(orderData, navigation)}
            >
              <View style={styles.checkoutButtonStyle}>
                <Text style={{ color: "#fff" }}>{strings.Order}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.checkoutButtonStyle}>
              <Tooltip popover={<Text>Select Address</Text>}>
                <Text style={{ color: "#fff" }}>{strings.Order}</Text>
              </Tooltip>
            </View>
          )}
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  firstCard: {
    backgroundColor: colors.bgTopWhite,
    width: "100%",
    padding: 10,
    alignItems: "flex-start",
  },

  firstText: {
    fontSize: 14,
  },
  secondCard: {
    alignItems: "center",
    flexDirection: "row",
  },
  thirdCard: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "red",
  },
  fourthCard: {
    borderRadius: 8,
    backgroundColor: colors.bgTopWhite,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  fifthCard: {
    backgroundColor: colors.bgTopWhite,
    width: "100%",
    padding: 10,
    alignItems: "flex-start",
    flex: 1,
  },
  cardFooter: {
    backgroundColor: colors.bgButton,
    overflow: "hidden",
    paddingLeft: 14,
    paddingRight: 14,
  },
  containermd: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 20,
  },
  containersd: {
    alignItems: "flex-start",
    paddingLeft: 20,
    flex: 1,
  },
  title: {
    fontWeight: "500",
  },
  titleAddress: {
    fontWeight: "bold",
    fontSize: 14,
  },
  subTitleAddress: {
    fontSize: 12,
    textAlign: "left",
    fontStyle: "italic",
  },
  cardBottom: {
    borderRadius: 8,
    backgroundColor: colors.white,
    height: 160,
    overflow: "hidden",
    padding: 8,
  },

  cardItems: {
    borderRadius: 8,
    backgroundColor: colors.bgTopWhite,
    overflow: "hidden",
    marginTop: 6,
  },
  cardItemsIn: {
    borderRadius: 8,
    backgroundColor: colors.white,
    overflow: "hidden",
    margin: 2,
  },
  cardPayments: {
    borderRadius: 8,
    backgroundColor: colors.bgTopWhite,
    height: 50,
    overflow: "hidden",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  containercd: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 20,
  },
  containerdd: {
    alignItems: "center",
    paddingLeft: 20,
  },
  icon: {
    marginTop: 10,
    marginBottom: 0,
  },

  detailsInvoice: {
    justifyContent: "center",
  },

  buttonContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeButtonStyle: {
    backgroundColor: colors.bgButton,
    marginRight: 10,
    flex: 1,
    justifyContent: "center",
  },
  checkoutButtonStyle: {
    backgroundColor: "#f39c12",
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 3,
    marginTop: 2,
    marginLeft: 10,
  },
  subTitle: {
    color: colors.medium,
    fontSize: 16,
  },
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
    margin: 10,
  },
  containterStyle: {
    flex: 4,
    backgroundColor: "#DCDCDC",
  },
  textQty: {
    justifyContent: "center",
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  invcontainer: {
    flexDirection: "row",
  },
  invoice: {
    height: 25,
    flex: 1,
  },
  invoiceTextIcon: {
    fontStyle: "italic",
    fontWeight: "bold",
    marginBottom: 10,
  },
  invoiceText: {
    paddingTop: 5,
    fontStyle: "italic",
    fontSize: 16,
  },
  invoicetitle: {
    paddingLeft: 4,
    fontSize: 16,
  },
});

export default OrderConfirmation;
