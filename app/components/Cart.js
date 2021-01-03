import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity} from "react-native";

const Cart = (props) => {
  return (
    <TouchableOpacity  onPress={props.onPress}>
         <MaterialCommunityIcons
             name="cart"
             color={"#001f3f"} 
             size={40} 
          />
    </TouchableOpacity>
  );
};

export default Cart;

