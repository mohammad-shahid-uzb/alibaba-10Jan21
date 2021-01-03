import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/Ionicons";

import Text from "../Text";
import colors from "../../config/colors";

function ShopCartList({
  onPress,
  renderRightActions,
  index,
  item,
  cart,
  increment,
  decrement,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <>
          <View
            style={
              index + 1 === cart.length
                ? styles.lastItemStyle
                : styles.containerStyle
            }
          >
            <Image
              source={{ uri: item.hospitalImage[0] }}
              style={styles.imageStyle}
            />
            <View style={styles.textStyle}>
              <Text style={{ color: "#2e2f30" }} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.priceStyle}>
                <Text style={{ color: "#2e2f30", fontSize: 12 }}>
                  {item.price}
                </Text>
              </View>
            </View>
            <View style={styles.counterStyle}>
              <Icon.Button
                name="ios-remove"
                size={15}
                color="#3e4444"
                backgroundColor="#fff"
                style={{
                  borderRadius: 10,
                  backgroundColor: "#deeaee",
                  height: 30,
                  width: 30,
                }}
                iconStyle={{ marginRight: 0 }}
                onPress={() => decrement(item._id)}
              />
              <Text style={styles.textQty}>{item.count}</Text>
              <Icon.Button
                name="ios-add"
                size={15}
                color="#3e4444"
                backgroundColor="#fff"
                style={{
                  borderRadius: 10,
                  backgroundColor: "#deeaee",
                  height: 30,
                  width: 30,
                }}
                iconStyle={{ marginRight: 0 }}
                onPress={() => increment(item._id)}
              />
            </View>
          </View>
        </>
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
  containerStyle: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    padding: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  lastItemStyle: {
    flexDirection: "row",
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  imageStyle: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  textStyle: {
    flex: 2,
    justifyContent: "center",
  },
  priceStyle: {
    backgroundColor: "#ddd",
    width: 60,
    alignItems: "center",
    marginTop: 3,
    borderRadius: 3,
  },
  counterStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  containterStyle: {
    flex: 4,
    backgroundColor: "#DCDCDC",
  },
});

export default ShopCartList;
