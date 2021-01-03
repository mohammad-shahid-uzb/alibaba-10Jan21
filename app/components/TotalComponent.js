import React, { useContext } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LocaleContext } from "../locales/index.js";

const TotalComponent = (props) => {
  const {
    containerStyle,
    goodsStyle,
    totalStyle,
    text,
    textVAT,
    secondcontainerStyle,
  } = styles;
  const { strings } = useContext(LocaleContext);

  return (
    <>
      <View style={containerStyle}>
        <View style={goodsStyle}>
          <Icon name="ios-cart" size={20} style={{ marginRight: 8 }} />
          <Text>
            {props.value.cart.length} {strings.goods}
          </Text>
        </View>
        <View style={totalStyle}>
          <Text style={text}>{strings.total}- </Text>
          <Text style={text}>UZS {props.value.total}</Text>
        </View>
      </View>
      <View style={secondcontainerStyle}>
        <View style={totalStyle}>
          <Text style={textVAT}>{strings.vat}</Text>
        </View>
      </View>
    </>
  );
};

const styles = {
  containerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
  },
  secondcontainerStyle: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingTop: 0.1,
  },
  goodsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    justifyContent: "center",
    color: "blue",
    fontWeight: "bold",
    fontSize: 14,
  },
  textVAT: {
    justifyContent: "center",
    color: "grey",
    fontWeight: "bold",
    fontSize: 12,
  },
};

export default TotalComponent;
