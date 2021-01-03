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

function Card({ item, title, subTitle, imageUrl, onPress, thumbnailUrl }) {
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
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
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
    marginRight: 15,
    overflow: "hidden",
    height: 240,
    width: 357,
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
    color: colors.danger,
    fontWeight: "bold",
  },
  title: {
    color: colors.tomato,
    marginBottom: 7,
  },
});

export default Card;
