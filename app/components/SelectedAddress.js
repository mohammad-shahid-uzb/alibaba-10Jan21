import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const SelectedAddress = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      {props.item.inCart ? (
        <MaterialCommunityIcons
          name="checkbox-marked-circle"
          size={32}
          color="#53D769"
        />
      ) : (
        <MaterialCommunityIcons
          name="checkbox-blank-circle-outline"
          size={32}
          color="#8ABFFD"
        />
      )}
    </TouchableOpacity>
  );
};

export default SelectedAddress;
