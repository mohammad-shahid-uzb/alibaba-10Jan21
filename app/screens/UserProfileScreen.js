import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import routes from "../navigation/routes";
import Text from "../components/Text";
import shippingApi from "../api/shippingAddress";

function UserProfileCard({ navigation, route }) {
  const [listings, setListings] = useState();
  const userId = route.params._id;

  useEffect(() => {
    loadListings(userId);
  }, [navigation]);

  const loadListings = async (userId) => {
    const response = await shippingApi.getListings({ userId });
    setListings(response.data);
  };

  return (
    <TouchableWithoutFeedback>
      <>
        <View style={styles.card}>
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              Name: {route.params.fname}
            </Text>
            <Text style={styles.title} numberOfLines={2}>
              Phone: {route.params.contact}
            </Text>
          </View>
        </View>
        {listings && !listings.error ? (
          <View style={styles.card}>
            <View style={styles.containersd}>
              <Text style={styles.invoiceTextIcon}>Profile Details</Text>
              <Text style={styles.titleAddress}>{listings.name}</Text>
              <Text style={styles.subTitleAddress}>
                House: {listings.address.flatNo}
              </Text>
              <Text style={styles.subTitleAddress}>
                {listings.address.street},
              </Text>
              <Text style={styles.subTitleAddress}>
                {listings.address.district},{listings.address.city}
              </Text>
              <Text style={styles.subTitleAddress}>{listings.phone}</Text>

              <View style={styles.editbuttonContainerStyle}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(routes.ADDRESS, listings)}
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
                onPress={() => navigation.navigate(routes.ADDRESS)}
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
  detailsContainer: {
    padding: 10,
  },
  containersd: {
    alignItems: "flex-start",
    paddingLeft: 24,
    marginTop: 10,
  },
  addContainer: {
    alignItems: "center",
    padding: 10,
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subTitleAddress: {
    fontSize: 16,
    textAlign: "left",
    fontStyle: "italic",
  },
  title: {
    marginBottom: 7,
  },
});

export default UserProfileCard;
