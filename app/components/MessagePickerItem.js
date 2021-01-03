import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";

import Text from "./Text";

function MessagePickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.label}>{item.label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    alignItems: "flex-start",
    width: "100%",
  },
  label: {
    marginTop: 5,
    textAlign: "left",
  },
});

export default MessagePickerItem;
