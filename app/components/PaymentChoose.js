import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, Text} from "react-native";

const PaymentChoose = (props) => {
 
  const cart = props.paymentMethod
 
  return (
    <TouchableOpacity >
         {cart ?<MaterialCommunityIcons
             name="bookmark"
             color={"green"} 
             size={30} 
          />:<Text></Text>}
    </TouchableOpacity>
  );
};

export default PaymentChoose;

