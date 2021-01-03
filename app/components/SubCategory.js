import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { LocaleContext } from "../locales/index.js";
import Screen from "./Screen";
import CardCat from "./Cardcate";
import useApi from "../hooks/useApi";
import categoriesApi from "../api/subcategories";
import routes from "../navigation/routes";
import ActivityIndicator from "../components/ActivityIndicator";

export default function SubCategory({ navigation, value = 1 }) {
  const getcategoriesApi = useApi(categoriesApi.getCategories);
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadCategory(value);
  }, [value]);

  const loadCategory = async (value) => {
    await getcategoriesApi.request(value).then((response) => {
      setItems(response.data);
    });
  };
  const { strings } = useContext(LocaleContext);

  return (
    <>
      <ActivityIndicator visible={getcategoriesApi.loading} />
      <Screen style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.textheader}>{strings.SubCategory}</Text>
        </View>
        <View style={styles.item}>
          <FlatList
            data={items}
            numColumns={2}
            renderItem={({ item }) => (
              <CardCat
                title={item.label}
                imageUrl={item.hospitalImage[0]}
                onPress={() => navigation.navigate(routes.FILTERLISTINGS, item)}
                thumbnailUrl={item.hospitalImage[0].thumbnailUrl}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 2,
  },
  header: {
    padding: 8,
    backgroundColor: "#7f8c8d",
    marginBottom: 5,
    borderRadius: 4,
  },
  item: {
    alignItems: "center",
    marginTop: 10,
  },
  textheader: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
