import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import listingsApi from "../api/listings";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";

import {
  ListItemwithout,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";

function MylistScreen({ navigation }) {
  const [listings, setListings] = useState([]);
  const { user } = useAuth();

  const deleteListingsApi = useApi(listingsApi.deleteListings);

  useEffect(() => {
    loadListings();
  }, [navigation]);

  const loadListings = async () => {
    const response = await listingsApi.getListings(user._id);
    setListings(response.data);
  };

  const handleDelete = async (listing) => {
    await deleteListingsApi.request(listing._id);
    setListings(listings.filter((l) => l._id !== listing._id));
  };

  return (
    <>
      <ActivityIndicator visible={listings.loading} />
      <Screen>
        <FlatList
          data={listings}
          keyExtractor={(listing, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItemwithout
              image={{ uri: item.hospitalImage[0] }}
              title={item.title}
              subTitle={"Сток : " + item.qty + " № "}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </Screen>
    </>
  );
}

export default MylistScreen;
