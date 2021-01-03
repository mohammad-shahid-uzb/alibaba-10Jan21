import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Image } from "react-native-expo-image-cache";
import colors from "../config/colors";
import ContactSellerForm from "../components/ContactSellerForm";
import ListItem from "../components/lists/ListItem";
import { CartContext } from "../utility/cartContext";
import Text from "../components/Text";
import routes from "../navigation/routes";
import Like from "../components/Collections";
import { LocaleContext } from "../locales/index.js";

function ListingDetailsScreen({ route, navigation }) {
  const { searchedDataSource, addToCart } = useContext(CartContext);
  const item = route.params;

  const [listings, setListings] = useState([]);
  const number = listings.length;

  useEffect(() => {
    const data = searchedDataSource.map(
      (o) => o.fromUserId === route.params.fromUserId
    );
    setListings(data);
  }, [navigation]);

  const width = useWindowDimensions().width;
  const height = width * 0.6;

  const [active, setActive] = useState(0);

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  };
  const { strings } = useContext(LocaleContext);

  return (
    <>
      <ScrollView style={styles.screen}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
        >
          <View>
            <ScrollView
              pagingEnabled
              horizontal
              onScroll={change}
              scrollEventThrottle={17}
              snapToAlignment="center"
              decelerationRate={"normal"}
              showHorizontalScrollIndicator={false}
            >
              {item.hospitalImage.map((image, index) => (
                <Image
                  key={index}
                  style={{ width, height }}
                  preview={{ uri: item.hospitalImage[0].thumbnailUrl }}
                  tint="light"
                  uri={image}
                />
              ))}
            </ScrollView>
            <View style={styles.pagination}>
              {item.hospitalImage.map((i, k) => (
                <Text
                  key={k}
                  style={k == active ? styles.activeDot : styles.dot}
                >
                  •
                </Text>
              ))}
            </View>
          </View>
          <View style={{ position: "absolute", top: 195, right: 10 }}>
            <Like
              colors={"red"}
              item={item}
              onPress={() => addToCart(item._id)}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.price}>UZS {item.price}</Text>
            <View style={styles.userContainer}>
              <ListItem
                image={require("../assets/shah.jpg")}
                title={item.fromUserName}
                subTitle={
                  number + " " + "опубликовано" + " " + item.fromUserContact
                }
                onPress={() =>
                  navigation.navigate(routes.FILTERLISTINGS, {
                    value: item.fromUserId,
                  })
                }
              />
            </View>
            <ContactSellerForm listing={item} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 40,
    padding: 8,
  },
  detailsContainer: {
    padding: 20,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: -25,
    alignSelf: "center",
  },
  dot: {
    color: "#888",
    fontSize: 20,
  },
  activeDot: {
    color: "red",
    fontSize: 20,
  },
});

export default ListingDetailsScreen;
