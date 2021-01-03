import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import Screen from "../components/Screen";
import ordersApi from "../api/ordersApi";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import colors from "../config/colors";

export default function StatusScreen({ navigation, route }) {
  const updateOrdersApi = useApi(ordersApi.updateOrders);

  const [status, setStatus] = useState("");

  const optionsToShow = [];
  optionsToShow.push(<Picker.Item key="0" label="Select Status" />);
  if (!route.params.status.accepted)
    optionsToShow.push(
      <Picker.Item key="1" label="Accepted" value="Accepted" />
    );
  else if (!route.params.status.packaged)
    optionsToShow.push(
      <Picker.Item key="2" label="Packaged" value="Packaged" />
    );
  else if (!route.params.status.indelivery)
    optionsToShow.push(
      <Picker.Item key="3" label="In Delivery" value="InDelivery" />
    );
  else if (!route.params.status.delivered)
    optionsToShow.push(
      <Picker.Item key="4" label="Delivered" value="Delivered" />
    );

  const updatedStatus = {
    orderId: route.params.orderId,
    status,
  };
  const handleSubmit = async (orderData) => {
    if (orderData.status) {
      const data = await updateOrdersApi.request(orderData);
      if (!data.ok) {
        return alert(
          "Не удалось сохранить объявление. Пожалуйста, попробуйте еще раз."
        );
      } else {
        navigation.navigate(routes.ACCOUNT);
        return alert("Заказ успешно создан");
      }
    } else {
      return alert("попробуйте еще раз.");
    }
  };
  return (
    <>
      <Screen>
        <View>
          <Picker
            enabled={!!optionsToShow.length}
            selectedValue={status}
            onValueChange={(value) => {
              setStatus(value);
            }}
          >
            {optionsToShow.map((item) => item)}
          </Picker>
        </View>
        <View style={styles.button}>
          <Button
            disabled={!optionsToShow.length}
            title="SUBMIT"
            onPress={() => {
              handleSubmit(updatedStatus);
            }}
          />
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.baseColor1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});
