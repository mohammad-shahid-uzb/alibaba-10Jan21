import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import { LocaleContext } from "../locales/index";

function PaymentMethodScreen({ navigation }) {
  const [paymentType, setPaymentType] = useState(null);

  const choosePaymentType = (props) => {
    setPaymentType(props);
  };

  const { strings } = useContext(LocaleContext);

  return (
    <Screen style={styles.screen}>
      <View style={styles.containerTop}>
        <TouchableHighlight
          underlayColor={colors.light}
          onPress={() => choosePaymentType("card")}
        >
          <View style={styles.containersm}>
            <Icon name="ios-card" color="red" size={30} />
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{strings.Card}</Text>
            </View>
            {paymentType === "card" ? (
              <Icon
                name="ios-checkmark-circle-outline"
                color="green"
                size={30}
              />
            ) : (
              <Text></Text>
            )}
          </View>
        </TouchableHighlight>
      </View>
      <ListItemSeparator />
      <View style={styles.containerBottom}>
        <TouchableHighlight
          underlayColor={colors.light}
          onPress={() => choosePaymentType("cash")}
        >
          <View style={styles.containersm}>
            <Icon name="ios-wallet" color="blue" size={30} />
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{strings.Cash}</Text>
            </View>
            {paymentType === "cash" ? (
              <Icon
                name="ios-checkmark-circle-outline"
                color="green"
                size={30}
              />
            ) : (
              <Text></Text>
            )}
          </View>
        </TouchableHighlight>
      </View>
      {/* <View style={styles.footerStyle}>
        <Text style={styles.textStyle}>Get On Credit</Text>
      </View> */}
      {paymentType == "card" && (
        <View style={styles.nextButton}>
          <View style={styles.checkoutButtonStyleCard}>
            <TouchableHighlight
              underlayColor={"#72B2FD"}
              onPress={() => navigation.navigate(routes.CARDLIST, paymentType)}
            >
              <Text style={styles.textButton}>{strings.Select}</Text>
            </TouchableHighlight>
          </View>
        </View>
      )}
      {paymentType === "cash" && (
        <View style={styles.nextButton}>
          <View style={styles.checkoutButtonStyleCash}>
            <TouchableHighlight
              underlayColor={"#f39c12"}
              onPress={() =>
                navigation.navigate(routes.ORDERACCEPTED, paymentType)
              }
            >
              <Text style={styles.textButton}>{strings.order}</Text>
            </TouchableHighlight>
          </View>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  containerTop: {
    marginTop: 40,
  },
  containerBottom: {
    marginBottom: 35,
  },
  headerStyle: {
    flex: 0.1,
    elevation: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderRadius: 4,
    borderColor: "#e2e2e2",
    backgroundColor: "#ffe66d",
  },
  footerStyle: {
    flex: 0.1,
    elevation: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },
  containersm: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  nextButton: {
    flex: 1,
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
  checkoutButtonStyleCash: {
    backgroundColor: "#f39c12",
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
});

export default PaymentMethodScreen;
