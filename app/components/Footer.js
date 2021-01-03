import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import TotalComp from "../components/TotalComponent";
import routes from "../navigation/routes";
import { LocaleContext } from "../locales/index.js";

const Footer = (props) => {
  const {
    containerStyle,
    buttonContainerStyle,
    closeButtonStyle,
    checkoutButtonStyle,
  } = styles;

  const { strings } = useContext(LocaleContext);

  return (
    <View style={containerStyle}>
      <TotalComp value={props} />
      <View style={buttonContainerStyle}>
        <TouchableOpacity onPress={() => props.empty()}>
          <View style={closeButtonStyle}>
            <Text style={{ color: "#fff" }}>{strings.Clear}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={props.total > 0 ? false : true}
          onPress={() => props.navigation.navigate(routes.PAYMENT)}
        >
          <View style={checkoutButtonStyle}>
            <Text style={{ color: "#fff" }}>{strings.checkout}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    borderTopWidth: 1,
    borderColor: "#e2e2e2",
  },
  buttonContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
  },
  closeButtonStyle: {
    backgroundColor: "#7f8c8d",
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 3,
  },
  checkoutButtonStyle: {
    backgroundColor: "#f39c12",
    padding: 10,
    paddingRight: 60,
    paddingLeft: 60,
    borderRadius: 3,
  },
};

export default Footer;
