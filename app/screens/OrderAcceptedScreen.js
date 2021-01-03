import React from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Screen from "../components/Screen";
import colors from "../config/colors";
import Text from "../components/Text";
import { LocaleContext } from "../locales/index";
import { ListItemSeparator } from "../components/lists";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ShopCard from "../components/ShopCard";
import useAuth from "../auth/useAuth";
import moment from "moment";

const OrderAccepted = ({ route }) => {
  const { user } = useAuth();
  const ob = route.params.data.data;
  let shopOrder = [];
  Object.keys(ob).forEach((key) => {
    shopOrder.push(ob[key]);
  });
  const str = JSON.stringify(route.name);
  let date = shopOrder.map((i) => i.result.order.createdAt);
  const [First] = date;
  let acceptedTime = moment(First, "YYYY-MM-DDTHH: mm: ss").format("LT");
  const accepted = str.substr(7, 11);
  const packing = "false";
  const indelivery = "false";
  const delivered = "false";

  const addressBackEnd = shopOrder.map((i) => i.result.order.deliveryAddress);
  const [Address] = addressBackEnd;
  const FirstAddress = JSON.parse(Address);

  const shopId = shopOrder.map((i) => i.result.order.shopId);
  const OrderArr = shopOrder.map((i) => i.result.order);
  const shops = route.params.shops;
  let filtered = shops.filter((shop) => shopId.includes(shop.userId));

  const shopList = [];
  filtered.forEach((shop) => {
    shop.status = "true";
    shopList.push({ shop });
  });
  const delivery = 150;
  const shopNumber = shopOrder.length;
  const shippingCharges = delivery * shopNumber;
  const FinalAmount =
    shopOrder.map((i) => i.result.order.amount).reduce((a, b) => a + b, 0) /
    100;

  function mergeShopProfileWithOrder(OrderArr, shops) {
    const shopProfilesById = shops.reduce((a, b) => {
      a[b.userId] = b;
      return a;
    }, {});

    return OrderArr.map((order) => {
      order["shopProfile"] = shopProfilesById[order.shopId];
      return order;
    });
  }
  const OrderWithShop = mergeShopProfileWithOrder(OrderArr, shops);

  const { strings } = useContext(LocaleContext);
  console.log("strings ", strings.acceptedTitle);

  return (
    <Screen style={{ backgroundColor: colors.bgWhite, padding: 5 }}>
      <View style={styles.cardUpperTop}>
        <Text style={styles.titleAddress}>{strings.acceptedTitle} : Akors</Text>
        <Text style={styles.subTitleAddress}>
          {strings.orderNo} : 1123123123
        </Text>
      </View>
      <ScrollView>
        <View style={styles.cardTop}>
          <View style={styles.cardStatus}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.containerTopAccept}>
                <Text style={{ fontSize: 10 }}>{strings.accepted}</Text>
              </View>
              <View style={styles.containerTopLine} />
              <View style={styles.containerTopAccept}>
                <Text style={{ fontSize: 10 }}>{strings.packing}</Text>
              </View>
              <View style={styles.containerTopLine} />
              <View style={styles.containerTopAccept}>
                <Text style={{ fontSize: 10 }}>{strings.indelivery}</Text>
              </View>

              <View style={styles.containerTopLine} />
              <View style={styles.containerTopAccept}>
                <Text style={{ fontSize: 10 }}>{strings.delivered}</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.containerAccept}>
              {accepted === "false" ? (
                <EvilIcons name="minus" size={34} color={colors.primary} />
              ) : (
                <EvilIcons name="check" size={34} color={colors.secondary} />
              )}
            </View>
            {packing === "false" ? (
              <View style={styles.containerLine} />
            ) : (
              <View style={styles.containerGreenLine} />
            )}
            <View style={styles.containerAccept}>
              {packing === "false" ? (
                <EvilIcons name="minus" size={34} color={colors.primary} />
              ) : (
                <EvilIcons name="check" size={34} color={colors.secondary} />
              )}
            </View>
            {indelivery === "false" ? (
              <View style={styles.containerLine} />
            ) : (
              <View style={styles.containerGreenLine} />
            )}
            <View style={styles.containerAccept}>
              {indelivery === "false" ? (
                <EvilIcons name="minus" size={34} color={colors.primary} />
              ) : (
                <EvilIcons name="check" size={34} color={colors.secondary} />
              )}
            </View>
            {delivered === "false" ? (
              <View style={styles.containerLine} />
            ) : (
              <View style={styles.containerGreenLine} />
            )}
            <View style={styles.containerAccept}>
              {delivered === "false" ? (
                <EvilIcons name="minus" size={34} color={colors.primary} />
              ) : (
                <EvilIcons name="check" size={34} color={colors.secondary} />
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 15,
              }}
            >
              <MaterialCommunityIcons
                color={colors.medium}
                name="chevron-right"
                size={25}
              />
            </View>
          </View>
          <View style={styles.cardStatus}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.containerTopAccept}>
                <Text style={{ fontSize: 10, paddingLeft: 2 }}>
                  {acceptedTime}
                </Text>
              </View>
              <View style={styles.containerTopLine} />
              <View style={styles.containerTopAccept}>
                <Text style={{ fontSize: 10, paddingLeft: 8 }}>Times</Text>
              </View>
              <View style={styles.containerTopLine} />
              <View style={styles.containerTopAccept}>
                <Text style={{ fontSize: 10, paddingLeft: 8 }}>Times</Text>
              </View>
              <View style={styles.containerTopLine} />
              <View style={styles.containerTopAccept}>
                <Text style={{ fontSize: 10, paddingLeft: 11 }}>Times</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.containersm}>
          <View style={styles.detailsContainer}>
            <View style={styles.cardTime}>
              <View style={styles.containermd}>
                <View style={styles.icon}>
                  <EvilIcons name="clock" size={34} color="#147EFB" />
                </View>
              </View>
              <View style={styles.containersd}>
                <Text style={styles.titleAddress}>Delivery time</Text>
                <Text style={styles.subTitleAddress}>
                  Nov 14, 2020 from 14:00 to 16:00
                </Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.containermd}>
                <View style={styles.icon}>
                  <EvilIcons name="location" size={34} color="#147EFB" />
                </View>
              </View>
              <View style={styles.containersd}>
                <Text style={styles.invoiceTextIcon}>Delivery Address</Text>
                <Text style={styles.titleAddress}>{user.fname}</Text>
                <Text style={styles.subTitleAddress}>
                  House: FirstAddress.house-{FirstAddress.flatNo}
                </Text>
                <Text style={styles.subTitleAddress}>
                  {FirstAddress.street},
                </Text>
                <Text style={styles.subTitleAddress}>
                  {FirstAddress.district} {FirstAddress.city}
                </Text>
                <Text style={styles.subTitleAddress}>Mob:{user.contact}</Text>
              </View>
            </View>
            <View style={styles.cardBottom}>
              <View style={styles.invcontainer}>
                <View style={{ marginRight: 10 }}>
                  <FontAwesome5
                    name="file-invoice-dollar"
                    size={24}
                    color="#147EFB"
                  />
                </View>
                <Text style={styles.invoiceTextIcon}>Invoice</Text>
              </View>
              <ListItemSeparator />
              <View style={styles.invcontainer}>
                <View style={styles.invoice}>
                  <Text style={styles.invoicetitle}>Payment method</Text>
                </View>
                <Text style={styles.invoiceText}>Card</Text>
              </View>
              <ListItemSeparator />
              {route.params.paymentMethod === "card" && (
                <View style={styles.invcontainer}>
                  <View style={styles.invoice}>
                    <Text style={styles.invoicetitle}>Card Type</Text>
                  </View>
                  <Text style={styles.invoiceText}>
                    {route.params.cardType}
                  </Text>
                </View>
              )}
              <ListItemSeparator />
              <View style={styles.invcontainer}>
                <View style={styles.invoice}>
                  <Text style={styles.invoicetitle}>
                    Shipping cost-{shopNumber} shop
                  </Text>
                </View>
                <Text style={styles.invoiceText}>{shippingCharges} UZS</Text>
              </View>
              <ListItemSeparator />
              <View style={styles.invcontainer}>
                <View style={styles.invoice}>
                  <Text style={styles.invoicetitle}>Product cost</Text>
                </View>
                <Text style={styles.invoiceText}>
                  {FinalAmount - shippingCharges} UZS
                </Text>
              </View>
              <ListItemSeparator />
              {/* {route.params.paymentMethod == "card" &&
                route.params.cardType == "Visa" && (
                  <View style={styles.invcontainer}>
                    <View style={styles.invoice}>
                      <Text style={styles.invoicetitle}>Bank CC Charges</Text>
                    </View>
                    <Text style={styles.invoiceText}>
                      {shippingCharges + total * 0.0363} UZS
                    </Text>
                  </View>
                )} */}
              <ListItemSeparator />
              <View style={styles.invcontainer}>
                <View style={styles.invoice}>
                  <Text style={{ fontWeight: "bold" }}>Final Payment</Text>
                </View>
                <Text style={{ fontWeight: "bold", paddingTop: 5 }}>
                  {FinalAmount} UZS
                </Text>
              </View>
              <ListItemSeparator />
            </View>
            <View style={styles.cardBottomSeller}>
              <View style={styles.invcontainer}>
                <View style={{ marginRight: 10 }}>
                  <FontAwesome5 name="address-card" size={24} color="#147EFB" />
                </View>
                <Text style={styles.invoiceTextIcon}>Seller's Address</Text>
              </View>
              <ListItemSeparator />
              <View style={{ marginBottom: 5 }}>
                <FlatList
                  horizontal
                  data={OrderWithShop}
                  keyExtractor={(listing, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={{ margin: 2 }}>
                      <ShopCard item={item} />
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: colors.bgTopWhite,
    height: 125,
    overflow: "hidden",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  cardShop: {
    borderRadius: 8,
    backgroundColor: colors.bgTopWhite,
    height: 155,
    overflow: "hidden",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  cardTime: {
    borderRadius: 8,
    backgroundColor: colors.bgTopWhite,
    height: 50,
    overflow: "hidden",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  cardBottom: {
    borderRadius: 8,
    backgroundColor: colors.bgTopWhite,
    height: 190,
    overflow: "hidden",
    marginTop: 8,
    marginBottom: 2,
    padding: 8,
  },
  cardBottomSeller: {
    borderRadius: 8,
    backgroundColor: colors.bgTopWhite,
    marginTop: 8,
    padding: 8,
    marginBottom: 8,
  },
  cardFooter: {
    backgroundColor: colors.bgButton,
    overflow: "hidden",
    paddingLeft: 14,
    paddingRight: 14,
  },
  cardTop: {
    backgroundColor: colors.bgTopWhite,
    padding: 5,
  },
  cardUpperTop: {
    backgroundColor: colors.white,
    marginBottom: 10,
    height: 40,
    alignItems: "center",
  },
  cardStatus: {
    height: 15,
  },
  cardItems: {
    borderRadius: 8,
    backgroundColor: colors.bgTopWhite,
    overflow: "hidden",
    marginTop: 8,
  },
  cardItemsIn: {
    borderRadius: 8,
    backgroundColor: colors.white,
    overflow: "hidden",
    margin: 5,
  },
  cardPayments: {
    borderRadius: 8,
    backgroundColor: colors.bgTopWhite,
    height: 75,
    overflow: "hidden",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  containersm: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  containerAccept: {
    alignItems: "center",
    flexDirection: "row",
    width: "10%",
  },
  containerTopAccept: {
    alignItems: "center",
    flexDirection: "row",
    width: "15%",
    paddingLeft: 5,
  },
  containerLine: {
    alignItems: "center",
    width: "20%",
    borderBottomColor: "red",
    borderBottomWidth: 1,
    height: "50%",
    marginLeft: -7,
    marginRight: -7,
  },
  containerGreenLine: {
    alignItems: "center",
    width: "20%",
    borderBottomColor: "green",
    borderBottomWidth: 1,
    height: "50%",
    marginLeft: -7,
    marginRight: -7,
  },
  containerTopLine: {
    alignItems: "center",
    width: "10%",
    borderBottomColor: colors.bgTopWhite,
    borderBottomWidth: 1,
    height: "50%",
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
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  Text: {
    fontSize: 14,
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
    alignItems: "center",
  },
  subTitle: {
    color: colors.medium,
    fontSize: 16,
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
  screen: {
    padding: 10,
  },
  textQty: {
    justifyContent: "center",
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  invcontainer: {
    flexDirection: "row",
    marginBottom: 0,
    paddingBottom: 0,
  },
  invoice: {
    height: 25,
    flex: 1,
    margin: 2,
  },
  invoiceTextIcon: {
    fontStyle: "italic",
    marginBottom: 1,
    fontSize: 16,
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

export default OrderAccepted;
