import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import Text from "../components/Text";
import colors from "../config/colors";

function CardCat({ title, imageUrl, onPress, thumbnailUrl }) {
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
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.light,
    marginBottom: 7,
    overflow: "hidden",
    paddingHorizontal: 2,
    marginHorizontal: 4,
  },
  detailsContainer: {
    padding: 12,
  },
  image: {
    height: 100,
    borderRadius: 10,
    width: "100%",
  },

  title: {
    marginBottom: 1,
    width: 90,
    textAlign: "center",
    fontSize: 13,
  },
});

export default CardCat;
