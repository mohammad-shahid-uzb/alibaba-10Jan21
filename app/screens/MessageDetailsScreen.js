import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import ContactBuyerForm from "../components/ContactBuyerForm";
import Text from "../components/Text";

function MessageDetailsScreen({ route }) {
  const message = route.params;

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      >
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{message.fromUserName}</Text>
          <Text style={styles.price}>{message.content}</Text>
          <ContactBuyerForm message={message} />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default MessageDetailsScreen;
