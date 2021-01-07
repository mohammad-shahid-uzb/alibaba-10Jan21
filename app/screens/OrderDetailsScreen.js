import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import moment from "moment";
import colors from "../config/colors";
import Text from "../components/Text";
import Screen from "../components/Screen";
import ShopCard from "../components/ShopCard";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { ListItemSeparator } from "../components/lists";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import routes from "../navigation/routes";

const OrderDetailsScreen = ({ navigation, route }) => {
  const address = route.params.item.deliveryAddress;
  const addressBackEnd = JSON.parse(address);
  const userId = route.params.item.shopId;
  const orderNumber = route.params.item.orderNumber;
  let date = route.params.item.createdAt;
  const createdAt = moment(date, "YYYY-MM-DDTHH: mm: ss").format("DD-MM-YYYY");
  let acceptedTime = moment(date, "YYYY-MM-DDTHH: mm: ss").format("LT");

  const shopProfile = route.params.shops.filter((i) => i.userId === userId);

  const accepted = route.params.item.status.accepted;
  const timeAccepted = moment(accepted).format("DD MMM hh:mm a");
  const packing = route.params.item.status.packaged;
  const timePacking = moment(packing).format("DD MMM YY hh:mm a");

  const indelivery = route.params.item.status.indelivery;
  const timeIndelivery = moment(indelivery).format("DD MMM YY hh:mm a");

  const delivered = route.params.item.status.delivered;
  const timeDelivered = moment(delivered).format("DD MMM YY hh:mm a");

  const delivery = 150;
  const orderAmount = route.params.item.amount / 100;
  const FinalAmount = orderAmount;
  const ShopDetails = {
    shopProfile,
    status: route.params.item.status,
    Order: route.params.item.orderNumber,
    orderId: route.params.item._id,
  };
  const [item] = ShopDetails.shopProfile;
  console.log("shopOne ", item);
  return (
    <Screen style={{ backgroundColor: colors.bgWhite, padding: 5 }}>
      <View style={styles.cardUpperTop}>
        <Text style={styles.titleAddress}>Accepted Order By : Akors</Text>
        <Text style={styles.subTitleAddress}>
          Order No :{orderNumber} Dated: {createdAt.split("T")[0]}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.cardTop}>
          <View style={styles.cardStatus}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.containerTopUpAccept}>
                <Text style={{ fontSize: 10 }}>Accepted</Text>
              </View>
              <View style={styles.containerTopLine} />
              <View style={styles.containerTopUpAccept}>
                <Text style={{ fontSize: 10 }}>Packaging</Text>
              </View>
              <View style={styles.containerTopLine} />
              <View style={styles.containerTopUpAccept}>
                <Text style={{ fontSize: 10 }}>In Transit</Text>
              </View>

              <View style={styles.containerTopLine} />
              <View style={styles.containerTopUpAccept}>
                <Text style={{ fontSize: 10 }}>Delivered</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.STATUS, ShopDetails)}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={styles.containerAccept}>
                {accepted !== null ? (
                  <EvilIcons name="check" size={34} color={colors.secondary} />
                ) : (
                  <EvilIcons name="minus" size={34} color={colors.primary} />
                )}
              </View>
              {packing !== null ? (
                <View style={styles.containerGreenLine} />
              ) : (
                <View style={styles.containerLine} />
              )}
              <View style={styles.containerAccept}>
                {packing !== null ? (
                  <EvilIcons name="check" size={34} color={colors.secondary} />
                ) : (
                  <EvilIcons name="minus" size={34} color={colors.primary} />
                )}
              </View>
              {indelivery !== null ? (
                <View style={styles.containerGreenLine} />
              ) : (
                <View style={styles.containerLine} />
              )}
              <View style={styles.containerAccept}>
                {indelivery !== null ? (
                  <EvilIcons name="check" size={34} color={colors.secondary} />
                ) : (
                  <EvilIcons name="minus" size={34} color={colors.primary} />
                )}
              </View>
              {delivered !== null ? (
                <View style={styles.containerGreenLine} />
              ) : (
                <View style={styles.containerLine} />
              )}
              <View style={styles.containerAccept}>
                {delivered !== null ? (
                  <EvilIcons name="check" size={34} color={colors.secondary} />
                ) : (
                  <EvilIcons name="minus" size={34} color={colors.primary} />
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
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.containerTopAccept}>
              {accepted !== null ? (
                <Text style={{ fontSize: 9 }} numberOfLines={2}>
                  {timeAccepted}
                </Text>
              ) : (
                <Text style={{ fontSize: 9 }}></Text>
              )}
            </View>
            <View style={styles.containerTopLine} />
            <View style={styles.containerTopAccept}>
              {packing !== null ? (
                <Text style={{ fontSize: 9 }} numberOfLines={2}>
                  {timePacking}
                </Text>
              ) : (
                <Text style={{ fontSize: 9 }}></Text>
              )}
            </View>
            <View style={styles.containerTopLine} />
            <View style={styles.containerTopAccept}>
              {indelivery !== null ? (
                <Text style={{ fontSize: 9 }} numberOfLines={2}>
                  {timeIndelivery}
                </Text>
              ) : (
                <Text style={{ fontSize: 9 }}></Text>
              )}
            </View>
            <View style={styles.containerTopLine} />
            <View style={styles.containerTopAccept}>
              {delivered !== null ? (
                <Text style={{ fontSize: 9 }} numberOfLines={2}>
                  {timeDelivered}
                </Text>
              ) : (
                <Text style={{ fontSize: 9 }}></Text>
              )}
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
                  {createdAt.split("T")[0]}-{acceptedTime}
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
                <Text style={styles.titleAddress}>
                  addressBackEnd.contactname
                </Text>
                <Text style={styles.subTitleAddress}>
                  House: addressBackEnd.house-{addressBackEnd.flatNo}
                </Text>
                <Text style={styles.subTitleAddress}>
                  {addressBackEnd.street},
                </Text>
                <Text style={styles.subTitleAddress}>
                  {addressBackEnd.district},{addressBackEnd.city}
                </Text>
                <Text style={styles.subTitleAddress}>
                  Mob:addressBackEnd.mobile
                </Text>
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
                <Text style={styles.invoiceText}>
                  {route.params.item.paymentDetails.method}
                </Text>
              </View>
              <ListItemSeparator />
              {route.params.item.paymentDetails.method === "card" && (
                <View style={styles.invcontainer}>
                  <View style={styles.invoice}>
                    <Text style={styles.invoicetitle}>Card Type</Text>
                  </View>
                  <Text style={styles.invoiceText}>Uz Card</Text>
                </View>
              )}
              <ListItemSeparator />
              <View style={styles.invcontainer}>
                <View style={styles.invoice}>
                  <Text style={styles.invoicetitle}>Shipping cost</Text>
                </View>
                <Text style={styles.invoiceText}>{delivery} UZS</Text>
              </View>
              <ListItemSeparator />
              <View style={styles.invcontainer}>
                <View style={styles.invoice}>
                  <Text style={styles.invoicetitle}>Product cost</Text>
                </View>
                <Text style={styles.invoiceText}>
                  {FinalAmount - delivery} UZS
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
                <View style={{ margin: 2 }}>
                  <View style={styles.shopcard}>
                    <View style={styles.shopdetailsContainer}>
                      <Text style={styles.shoptitle} numberOfLines={1}>
                        ShopName: {item.name}
                      </Text>
                      <Text style={styles.shopsubTitle} numberOfLines={3}>
                        Address: {item.officeAddress}
                      </Text>
                      <Text style={styles.shopsubTitle} numberOfLines={2}>
                        Contact Name: {item.directorName}
                      </Text>
                      <Text style={styles.shopsubTitle} numberOfLines={2}>
                        Phone: {item.contactNumber} / {item.phone}
                      </Text>
                      <Text style={styles.shopsubTitle} numberOfLines={2}>
                        Status:
                        {ShopDetails.status.delivered
                          ? "Delivered"
                          : ShopDetails.status.indelivery
                          ? "In Transit"
                          : ShopDetails.status.packaged
                          ? "Packaged"
                          : ShopDetails.status.accepted
                          ? "Accepted"
                          : "None"}
                      </Text>
                      <Text style={styles.shopsubTitle} numberOfLines={2}>
                        Invoice No: {ShopDetails.Order}
                      </Text>
                    </View>
                  </View>
                </View>
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
    alignItems: "center",
  },
  cardStatus: {
    width: "160%",
  },
  cardStatusTime: {
    width: "100%",
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
    flexDirection: "row",
    width: "10%",
  },
  containerTopUpAccept: {
    flexDirection: "row",
  },
  containerTopAccept: {
    flexDirection: "row",
    backgroundColor: "white",
    marginRight: -9,
  },
  containerLine: {
    alignItems: "center",
    width: "21%",
    borderBottomColor: "red",
    borderBottomWidth: 1,
    height: "50%",
    marginLeft: -7,
    marginRight: -7,
  },
  containerGreenLine: {
    alignItems: "center",
    width: "21%",
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
  shopcard: {
    borderRadius: 15,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#8FD9FA",
    width: 300,
  },
  shopdetailsContainer: {
    padding: 10,
  },
  shopsubTitle: {
    fontWeight: "bold",
    fontSize: 12,
  },
  shoptitle: {
    marginBottom: 7,
  },
});

export default OrderDetailsScreen;
