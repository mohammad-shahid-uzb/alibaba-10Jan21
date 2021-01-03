import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const Like = (props) => {
  const cart = props.item.inCart;

  return (
    <TouchableOpacity disabled={cart ? true : false} onPress={props.onPress}>
      {cart ? (
        <MaterialCommunityIcons
          name="bookmark"
          color={props.item.color}
          size={30}
        />
      ) : (
        <MaterialCommunityIcons
          name="bookmark"
          color={props.item.color}
          size={30}
        />
      )}
    </TouchableOpacity>
  );
};

export default Like;
