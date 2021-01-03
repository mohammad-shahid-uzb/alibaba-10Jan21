import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import routes from "../navigation/routes";
import Text from "../components/Text";

function ShopProfileCard({ route, navigation }) {
  const item = route.params;

  return (
    <TouchableWithoutFeedback>
      <>
        <View style={styles.card}>
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              Shop Name: {route.params.user.fname}
            </Text>
            <Text style={styles.title} numberOfLines={2}>
              Phone: {route.params.user.contact}
            </Text>
          </View>
        </View>
        {item.listings && !item.listings.error ? (
          <View style={styles.card}>
            <View style={styles.detailsContainer}>
              <Text style={styles.title} numberOfLines={1}>
                Director Name: {route.params.listings.directorName}
              </Text>
              <Text style={styles.title} numberOfLines={1}>
                Director Passport No.: {route.params.listings.directorPassport}
              </Text>
              <Text style={styles.title} numberOfLines={3}>
                Office Address: {route.params.listings.officeAddress}
              </Text>
              <Text style={styles.title} numberOfLines={2}>
                Registration/Gvhanama No:{" "}
                {route.params.listings.registrationNumber}
              </Text>
              <Text style={styles.title} numberOfLines={2}>
                ENN No: {route.params.listings.ennNumber}
              </Text>
              <Text style={styles.title} numberOfLines={2}>
                VAT No: {route.params.listings.vatNumber}
              </Text>
              <Text style={styles.title} numberOfLines={2}>
                Contact Number:{route.params.listings.phone}
              </Text>
              <Text style={styles.title} numberOfLines={2}>
                Email Id: {route.params.listings.email}
              </Text>
              <View style={styles.editbuttonContainerStyle}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(routes.SHOPROFILEEDIT, item)
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
        ) : (
          <View style={styles.card}>
            <View style={styles.addContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate(routes.SHOPROFILEEDIT)}
              >
                <View style={styles.editcloseButtonStyle}>
                  <Text
                    style={{
                      color: "#f39c12",
                    }}
                  >
                    Add Your Profile
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#8FD9FA",
    margin: 5,
  },
  addContainer: {
    alignItems: "center",
    padding: 10,
  },
  detailsContainer: {
    padding: 10,
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 12,
  },
  title: {
    marginBottom: 7,
  },
});

export default ShopProfileCard;
