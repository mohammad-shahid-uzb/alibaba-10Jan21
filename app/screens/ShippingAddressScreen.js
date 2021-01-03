import React, { useContext, useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import useLocation from "../hooks/useLocation";
import { CartContext } from "../utility/cartContext";
import { EvilIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { ListItemSeparator } from "../components/lists";
import SelectedAddress from "../components/SelectedAddress";
import routes from "../navigation/routes";
import shippingApi from "../api/shippingAddress";

const ShippingAddress = ({ navigation, route }) => {
  const [itemsAddress, setItemsAddress] = useState([]);
  const [addressCard, setCard] = useState();

  const { user } = useAuth();
  const userId = user._id;

  useEffect(() => {
    getShippingAddress(userId);
  }, [route]);

  const getShippingAddress = async (userId) => {
    const response = await shippingApi.getShippingAddress({ userId });
    setItemsAddress(response.data);
  };

  useEffect(() => {
    chooseCard();
  }, []);

  const chooseCard = (id) => {
    var newArr = itemsAddress.map((d) => {
      if (d._id === id) {
        d.inCart = true;
        setCard(d);
        return d;
      }
      {
        d.inCart = false;
        return d;
      }
    });
    setItemsAddress(newArr);
  };
  const location = useLocation();
  //console.log("location ", location);
  return (
    <>
      <Screen>
        <View>
          <>
            <FlatList
              data={itemsAddress}
              keyExtractor={(listing, index) => index.toString()}
              renderItem={({ item }) => (
                <>
                  <View style={styles.containerTop}>
                    <TouchableHighlight underlayColor={colors.light}>
                      <View style={styles.containersm}>
                        <SelectedAddress
                          item={item}
                          onPress={() => chooseCard(item._id)}
                        />
                        <View style={styles.detailsContainer}>
                          <View style={styles.card}>
                            <View style={styles.containermd}>
                              <View style={styles.icon}>
                                <EvilIcons
                                  name="location"
                                  size={34}
                                  color="#147EFB"
                                />
                              </View>
                              <Text style={styles.title}>{user.fname}</Text>
                            </View>
                            <Text style={styles.subTitle}>
                              House: {item.address.flatNo}
                            </Text>
                            <Text style={styles.subTitle}>
                              {item.address.street},{item.address.district}
                            </Text>
                            <Text style={styles.subTitle}>
                              {item.address.city},{item.address.pincode}.
                            </Text>
                            <Text style={styles.subTitle}>
                              Mob:{user.contact}
                            </Text>
                            <View style={styles.editbuttonContainerStyle}>
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate(
                                    routes.SHIPPINGADDRESS,
                                    item
                                  )
                                }
                              >
                                <View style={styles.editcloseButtonStyle}>
                                  <Text
                                    style={{
                                      color: "#f39c12",
                                    }}
                                  >
                                    Edit
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableHighlight>
                  </View>
                </>
              )}
              ItemSeparatorComponent={ListItemSeparator}
            />
          </>
        </View>
      </Screen>
      {addressCard && (
        <View style={styles.nextButton}>
          <View style={styles.checkoutButtonStyleCard}>
            <TouchableHighlight
              underlayColor={"#72B2FD"}
              onPress={() => navigation.navigate(routes.ORDER, addressCard)}
            >
              <Text style={styles.textButton}>Place Order</Text>
            </TouchableHighlight>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  bookmark: {
    textAlign: "right",
  },
  card: {
    borderRadius: 15,
    backgroundColor: colors.light,
    overflow: "hidden",
    margin: 10,
    width: "90%",
    height: 170,
  },
  detailsContainer: {
    padding: 10,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    marginLeft: 55,
  },
  title: {
    alignItems: "flex-start",
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
  icon: {
    marginTop: 10,
  },
  containersm: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.white,
  },
  containermd: {
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 20,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  nextButton: {
    flex: 0.1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
    width: "100%",
  },
  checkoutButtonStyleCard: {
    backgroundColor: "#72B2FD",
    padding: 10,
    borderRadius: 4,
    width: "100%",
  },
  textButton: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontWeight: "bold",
    textAlign: "center",
  },
  editbuttonContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 55,
    marginTop: 10,
  },
  editcloseButtonStyle: {
    backgroundColor: colors.bgWhite,
    paddingRight: 10,
    paddingLeft: 10,
  },
});

export default ShippingAddress;
