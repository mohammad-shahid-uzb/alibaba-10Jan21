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
import { CartContext } from "../utility/cartContext";
import ActivityIndicator from "../components/ActivityIndicator";

function UIScreen({ navigation }) {
  const getcategoriesApi = useApi(categoriesApi.getCategories);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getcategoriesApi.request().then((response) => {
      setItems(response.data);
    });
  }, []);

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

  return (
    <>
      <SafeAreaView style={styles.container} />
      <View style={styles.topBar}>
        <View style={{ width: "85%", height: 50 }}>
          <SearchBar
            round
            searchIcon={{ size: 24, color: "blue" }}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction("")}
            placeholder="Введите здесь для поиска..."
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
            <AppText>Не удалось получить списки.</AppText>
            <Button title="Повторить" onPress={getListingsApi.request} />
          </>
        )}
        <FlatList
          data={Object.keys(groupedCategory).slice(0, 1)}
          initialNumToRender={10}
          windowSize={5}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={30}
          removeClippedSubviews={false}
          onEndReachedThreshold={0.1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => (
            <>
              <View style={styles.header} key={item.id}>
                {/* <EvilIcons name="credit-card" size={25} color="#147EFB" /> */}
                <Text style={styles.textheader}>{item.item}</Text>
              </View>
              <FlatList
                horizontal
                data={groupedCategory[item.item]}
                initialNumToRender={10}
                windowSize={5}
                maxToRenderPerBatch={5}
                updateCellsBatchingPeriod={30}
                removeClippedSubviews={false}
                onEndReachedThreshold={0.1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <>
                    <Card
                      title={item.title}
                      key={item.id}
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
                      key={item.id}
                    >
                      <Like
                        colors={"red"}
                        item={item}
                        onPress={() => addToCart(item._id)}
                      />
                    </View>
                  </>
                )}
              />
              <View style={styles.card} key={item.id}>
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
                  key={item.id}
                >
                  <Text style={styles.headerImage}>
                    You have a large list that is slow to update
                  </Text>
                  <Text style={styles.bottomImage}>
                    That is slow to update list that is slow to update
                  </Text>
                </View>
              </View>
              <FlatList
                data={Object.keys(groupedCategory).slice(4, 5)}
                initialNumToRender={10}
                windowSize={5}
                maxToRenderPerBatch={5}
                updateCellsBatchingPeriod={30}
                removeClippedSubviews={false}
                onEndReachedThreshold={0.1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => (
                  <>
                    <View style={styles.header} key={item.id}>
                      {/* <EvilIcons name="credit-card" size={25} color="#147EFB" /> */}
                      <Text style={styles.textheader}>{item.item}</Text>
                    </View>
                    <FlatList
                      horizontal
                      data={groupedCategory[item.item]}
                      initialNumToRender={10}
                      windowSize={5}
                      maxToRenderPerBatch={5}
                      updateCellsBatchingPeriod={30}
                      removeClippedSubviews={false}
                      onEndReachedThreshold={0.1}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
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
                            key={item.id}
                          />
                          <View
                            style={{
                              position: "absolute",
                              top: 200,
                              right: 30,
                            }}
                            key={item.id}
                          >
                            <Like
                              colors={"red"}
                              item={item}
                              onPress={() => addToCart(item._id)}
                            />
                          </View>
                        </>
                      )}
                    />
                    <View style={styles.card}>
                      <Image
                        style={styles.image}
                        tint="light"
                        preview={{
                          uri:
                            "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/2.jpg",
                        }}
                        uri={
                          "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/2.jpg"
                        }
                      />
                      <View
                        style={{
                          position: "absolute",
                          top: 50,
                          left: 20,
                          right: 10,
                        }}
                        key={item.id}
                      >
                        <Text style={styles.headerImage}>
                          You have a large list that is slow to update
                        </Text>
                        <Text style={styles.bottomImage}>
                          You have a large list that is slow to update
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              />
              <View style={styles.subCat}>
                <FlatList
                  data={items.slice(56, 59)}
                  numColumns={3}
                  initialNumToRender={10}
                  windowSize={5}
                  maxToRenderPerBatch={5}
                  updateCellsBatchingPeriod={30}
                  removeClippedSubviews={false}
                  onEndReachedThreshold={0.1}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <CardCat
                      title={item.label}
                      key={item.id}
                      imageUrl={item.hospitalImage[0]}
                      onPress={() =>
                        navigation.navigate(routes.FILTERLISTINGS, item)
                      }
                      thumbnailUrl={item.hospitalImage[0].thumbnailUrl}
                    />
                  )}
                />
              </View>
              <View style={styles.half} key={item.id}>
                <View style={styles.halfcard}>
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
                </View>
                <View style={styles.halfcard}>
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
          keyExtractor={(item, index) => index.toString()}
        />
      </Screen>
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
    flex: 0.08,
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
    marginTop: 5,
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
});

export default UIScreen;
