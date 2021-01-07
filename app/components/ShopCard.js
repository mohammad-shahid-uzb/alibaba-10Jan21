import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Text from "./Text";

function ShopCard({ item }) {
  return (
    <>
      <FlatList
        //horizontal
        data={item}
        keyExtractor={(listing, index) => index.toString()}
        renderItem={({ item }) => item}
      />
    </>
  );
}

const styles = StyleSheet.create({
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

export default ShopCard;
