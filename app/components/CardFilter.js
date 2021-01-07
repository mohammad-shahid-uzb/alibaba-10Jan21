import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-expo-image-cache";
import Text from "./Text";
import colors from "../config/colors";

function CardFilter({
  item,
  title,
  subTitle,
  imageUrl,
  onPress,
  thumbnailUrl,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          tint="light"
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  bookmark: {
    textAlign: "right",
  },
  card: {
    borderRadius: 10,
    backgroundColor: colors.white,
    marginTop: 5,
    marginBottom: 5,
    overflow: "hidden",
    height: 240,
    width: "100%",
  },
  detailsContainer: {
    position: "absolute",
    top: 165,
    left: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  subTitle: {
    color: colors.dark,
  },
  title: {
    color: "green",
    marginBottom: 7,
    fontWeight: "bold",
    top: -100,
    left: 0,
    backgroundColor: "#D60E64",
    fontSize: 15,
    color: "#fff",
  },
  discountText: {
    position: "absolute",
    top: -100,
    left: 320,
    backgroundColor: "#D60E64",
    fontSize: 15,
    color: "#fff",
  },
});

export default CardFilter;
