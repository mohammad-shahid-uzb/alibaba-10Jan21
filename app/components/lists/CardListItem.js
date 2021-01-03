import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/Ionicons";

import Text from "../Text";
import colors from "../../config/colors";

function CardListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  RightIcon,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          </View>
          {subTitle && (
            <Text style={styles.title} numberOfLines={1}>
              {subTitle}
            </Text>
          )}
          {RightIcon}
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    height: 50,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontSize: 18,
    marginTop: 14,
  },
});

export default CardListItem;
