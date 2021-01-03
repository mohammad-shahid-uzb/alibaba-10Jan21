import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import shopProfile from "../api/shopProfile";
import Text from "./Text";

function ShopCard({ item }) {
  let itemCard = item.shopProfile.find((obj) => obj);
  return (
    <TouchableWithoutFeedback>
      <View style={styles.shopcard}>
        {item && !item.error ? (
          <View style={styles.shopdetailsContainer}>
            <Text style={styles.shoptitle} numberOfLines={1}>
              ShopName: {itemCard.name}
            </Text>
            <Text style={styles.shopsubTitle} numberOfLines={3}>
              Address: {itemCard.officeAddress}
            </Text>
            <Text style={styles.shopsubTitle} numberOfLines={2}>
              Contact Name: {itemCard.directorName}
            </Text>
            <Text style={styles.shopsubTitle} numberOfLines={2}>
              Phone: {itemCard.contactNumber} / {itemCard.phone}
            </Text>
            <Text style={styles.shopsubTitle} numberOfLines={2}>
              Status:
              {item.status.delivered
                ? "Delivered"
                : item.status.indelivery
                ? "In Transit"
                : item.status.packaged
                ? "Packaged"
                : item.status.accepted
                ? "Accepted"
                : "None"}
            </Text>
            <Text style={styles.shopsubTitle} numberOfLines={2}>
              Invoice No: {item.Order}
            </Text>
          </View>
        ) : (
          <View style={styles.shopdetailsContainer}>
            <Text style={styles.shoptitle} numberOfLines={1}>
              Call For the Shop Details
            </Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
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
