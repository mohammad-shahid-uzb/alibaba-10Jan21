import React, { useEffect, useState, useContext } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";
import Like from "../components/Collections";
import { CartContext } from "../utility/cartContext";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import CardFilter from "../components/CardFilter";
import { LocaleContext } from "../locales/index.js";

function FilterListingsScreen({ navigation, route }) {
  const { filteredDataSource, addToCart, getListingsApi } = useContext(
    CartContext
  );

  const [listings, setListings] = useState([]);

  useEffect(() => {
    const data = filteredDataSource.filter(
      (o) => o.subcategoryId === route.params._id
    );
    setListings(data);
  }, [route.params._id]);

  const { strings } = useContext(LocaleContext);

  const ListEmptyView = () => {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ textAlign: "center" }}>{strings.filterListNot}</Text>
      </View>
    );
  };

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        <AppText style={styles.text}>
          {strings.itembycategory} : {route.params.label}
        </AppText>
        <FlatList
          data={listings}
          keyExtractor={(listing, index) => index.toString()}
          renderItem={({ item }) => (
            <>
              <CardFilter
                title={item.title}
                subTitle={"UZS" + " " + item.price}
                imageUrl={item.hospitalImage[0]}
                onPress={() =>
                  navigation.navigate(routes.LISTING_DETAILS, item)
                }
                thumbnailUrl={item.hospitalImage[0].thumbnailUrl}
              />
              <View style={{ position: "absolute", top: 190, right: 20 }}>
                <Like
                  colors={"red"}
                  item={item}
                  onPress={() => addToCart(item._id)}
                />
              </View>
            </>
          )}
          ListEmptyComponent={ListEmptyView}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  text: {
    color: colors.danger,
    padding: 5,
    textAlign: "center",
  },
});

export default FilterListingsScreen;
