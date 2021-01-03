import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import moment from "moment";
import Text from "../Text";
import colors from "../../config/colors";

function OrderListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  item,
}) {
  const createdAt = moment(item.createdAt, "YYYY-MM-DDTHH: mm: ss").format(
    "DD-MM-YYYY"
  );
  return (
    <>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
          <>
            <View style={styles.FirstContainer}>
              <Text style={styles.title}>
                Order No: {title}---
                <Text style={styles.datetitle}>Dated: {createdAt}</Text>
              </Text>
            </View>
            <View style={styles.container}>
              {IconComponent}
              {image && <Image style={styles.image} source={image} />}
              <View style={styles.detailsContainer}>
                {subTitle && (
                  <>
                    <Text style={styles.subTitle} numberOfLines={2}>
                      Items: {item.items.length} No
                    </Text>
                    <Text style={styles.subTitle} numberOfLines={2}>
                      Amount: {subTitle}
                    </Text>
                  </>
                )}
              </View>
              <MaterialCommunityIcons
                color={colors.medium}
                name="chevron-right"
                size={25}
              />
            </View>
          </>
        </TouchableHighlight>
      </Swipeable>
    </>
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
    marginLeft: 10,
    justifyContent: "center",
  },
  FirstContainer: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
    fontSize: 14,
  },
  datetitle: {
    fontWeight: "100",
    fontSize: 14,
    marginLeft: 10,
  },
});

export default OrderListItem;
