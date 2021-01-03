import React, { useContext, useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Text,
} from "react-native";
import CardCat from "../components/Cardcate";
import useApi from "../hooks/useApi";
import categoriesApi from "../api/subcategories";
import { SearchBar } from "react-native-elements";
import { Image } from "react-native-expo-image-cache";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import Like from "../components/Collections";
import Cart from "../components/Cart";
import { LocaleContext } from "../locales/index.js";
import { CartContext } from "../utility/cartContext";
import ActivityIndicator from "../components/ActivityIndicator";
import { TouchableOpacity } from "react-native-gesture-handler";

function ListingsScreen({ navigation, value = 1 }) {
  const getcategoriesApi = useApi(categoriesApi.getCategories);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getcategoriesApi.request().then((response) => {
      setItems(response.data);
      return () => {
        response.remove();
      };
    });
  }, [value]);

  const {
    addToCart,
    cart,
    searchFilterFunction,
    search,
    getListingsApi,
    searchedDataSource,
  } = useContext(CartContext);

  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  }
  const groupedCategory = groupBy(searchedDataSource, "categoryName");
  const categoryItem1 = {
    _id: "5f82e140754d1800176f0052",
    label: "First cat",
  };
  const categoryItem2 = {
    _id: "5f82efc2754d1800176f0089",
    label: "second cat",
  };

  const { strings } = useContext(LocaleContext);

  return (
    <>
      <SafeAreaView style={styles.container} />
      <View style={{ flex: 6, flexDirection: "column" }}>
        <View style={styles.topBar}>
          <View style={{ width: "85%", height: 50 }}>
            <SearchBar
              round
              searchIcon={{ size: 24, color: "blue" }}
              onChangeText={(text) => searchFilterFunction(text)}
              onClear={(text) => searchFilterFunction("")}
              placeholder={strings.Search}
              value={search}
              inputContainerStyle={{ backgroundColor: "white", height: 32 }}
              containerStyle={{
                borderWidth: 0.5,
                borderRadius: 12,
                backgroundColor: "white",
                marginBottom: 5,
              }}
            />
          </View>
          <View
            style={{
              width: "15%",
              height: 50,
              backgroundColor: "white",
              borderWidth: 0.5,
              borderRadius: 12,
              backgroundColor: "white",
              marginBottom: 5,
            }}
          >
            <View style={styles.cart}>
              <Cart onPress={() => navigation.navigate(routes.CART)} />
              <View style={{ position: "absolute", left: 40, top: -5 }}>
                <AppText style={styles.text}>{cart.length}</AppText>
              </View>
            </View>
          </View>
        </View>
        <Screen style={styles.screen}>
          <ActivityIndicator visible={getListingsApi.loading} />
          {getListingsApi.error && (
            <>
              <AppText>{strings.NoList}</AppText>
              <Button title="Повторить" onPress={getListingsApi.request} />
            </>
          )}
          <View style={styles.TopSpace}>
            <FlatList
              data={Object.keys(groupedCategory)}
              initialNumToRender={10}
              windowSize={5}
              maxToRenderPerBatch={5}
              updateCellsBatchingPeriod={30}
              removeClippedSubviews={false}
              onEndReachedThreshold={0.1}
              keyExtractor={(item, index) => "AB" + item._id + index.toString()}
              renderItem={(item, index) => (
                <>
                  <View style={styles.header}>
                    {/* <EvilIcons name="credit-card" size={25} color="#147EFB" /> */}
                    <Text style={styles.textheader}>{item.item}</Text>
                  </View>
                  <FlatList
                    horizontal
                    keyExtractor={(item, index) =>
                      "AC" + item._id + index.toString()
                    }
                    data={groupedCategory[item.item]}
                    initialNumToRender={10}
                    windowSize={5}
                    maxToRenderPerBatch={5}
                    updateCellsBatchingPeriod={30}
                    removeClippedSubviews={false}
                    onEndReachedThreshold={0.1}
                    renderItem={({ item, index }) => (
                      <>
                        <Card
                          title={item.title}
                          subTitle={"UZS" + " " + item.price}
                          imageUrl={item.hospitalImage[0]}
                          onPress={() =>
                            navigation.navigate(routes.LISTING_DETAILS, item)
                          }
                          thumbnailUrl={item.hospitalImage[0].thumbnailUrl}
                          item={item}
                        />
                        <View
                          style={{
                            position: "absolute",
                            top: 200,
                            right: 30,
                          }}
                        >
                          <Like
                            item={item}
                            onPress={() => addToCart(item._id)}
                          />
                        </View>
                      </>
                    )}
                  />
                  <View style={styles.card}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(
                          routes.FILTERLISTINGS,
                          categoryItem1
                        )
                      }
                    >
                      <Image
                        style={styles.image}
                        tint="light"
                        preview={{
                          uri:
                            "https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(42).jpg",
                        }}
                        uri={
                          "https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(42).jpg"
                        }
                      />
                      <View
                        style={{
                          position: "absolute",
                          top: 50,
                          left: 20,
                          right: 10,
                        }}
                      >
                        <Text style={styles.headerImage}>First Card</Text>
                        <Text style={styles.bottomImage}>
                          That is slow to update list that is slow to update
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.subCat}>
                    <FlatList
                      data={items.slice(50, 59)}
                      numColumns={3}
                      initialNumToRender={10}
                      windowSize={5}
                      maxToRenderPerBatch={5}
                      updateCellsBatchingPeriod={30}
                      removeClippedSubviews={false}
                      onEndReachedThreshold={0.1}
                      keyExtractor={(item, index) =>
                        "AG" + item._id + index.toString()
                      }
                      renderItem={({ item, index }) => (
                        <CardCat
                          title={item.label}
                          imageUrl={item.hospitalImage[0]}
                          onPress={() =>
                            navigation.navigate(routes.FILTERLISTINGS, item)
                          }
                          thumbnailUrl={item.hospitalImage[0].thumbnailUrl}
                        />
                      )}
                    />
                  </View>
                  <View style={styles.half}>
                    <View style={styles.halfcard}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate(
                            routes.FILTERLISTINGS,
                            categoryItem1
                          )
                        }
                      >
                        <Image
                          style={styles.image}
                          tint="light"
                          preview={{
                            uri:
                              "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img%20(55).jpg",
                          }}
                          uri={
                            "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img%20(55).jpg"
                          }
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.halfcard}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate(
                            routes.FILTERLISTINGS,
                            categoryItem2
                          )
                        }
                      >
                        <Image
                          style={styles.image}
                          tint="light"
                          preview={{
                            uri:
                              "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img%20(30).jpg",
                          }}
                          uri={
                            "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img%20(30).jpg"
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.card}>
                    <View
                      style={{
                        position: "absolute",
                        top: 50,
                        left: 20,
                        right: 10,
                      }}
                    >
                      <Text style={styles.headerImage}>
                        You have a large list that is slow to update
                      </Text>
                      <Text style={styles.bottomImage}>
                        That is slow to update list that is slow to update
                      </Text>
                    </View>
                  </View>
                </>
              )}
            />
          </View>
        </Screen>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.light,
  },
  cart: {
    alignItems: "center",
    paddingTop: 6,
  },
  card: {
    borderRadius: 10,
    backgroundColor: colors.tomato,
    overflow: "hidden",
    height: 240,
    width: "100%",
    marginTop: 10,
    marginBottom: 5,
  },
  halfcard: {
    borderRadius: 10,
    backgroundColor: colors.tomato,
    overflow: "hidden",
    height: 200,
    width: "46%",
    margin: 10,
  },
  half: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 0,
    backgroundColor: "#ff8254",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  topBar: {
    flex: 0.09,
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: colors.tomato,
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: "red",
  },
  header: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f4c0ff",
    marginBottom: 5,
    flexDirection: "row",
    borderRadius: 10,
  },
  textheader: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  headerImage: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 26,
    padding: 10,
    alignItems: "center",
    textAlign: "center",
  },
  bottomImage: {
    color: colors.red,
    fontWeight: "bold",
    fontSize: 14,
    paddingLeft: 10,
    alignItems: "center",
    textAlign: "center",
    marginTop: 20,
  },
  subCat: {
    alignItems: "center",
    marginTop: 10,
  },
  TopSpace: {
    marginBottom: 10,
  },
});

export default ListingsScreen;
