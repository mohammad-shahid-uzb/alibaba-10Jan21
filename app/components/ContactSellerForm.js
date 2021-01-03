import React from "react";
import { Alert, Keyboard } from "react-native";
import { Notifications } from "expo";
import * as Yup from "yup";
import CategoryPickerItem from "../components/CategoryPickerItem";
import { Form, SubmitButton, FormPicker as Picker } from "./forms";
import messagesApi from "../api/messages";

const messages = [
  {
    label: "Q.1:Привет! Этот товар еще доступен?",
    value: 1,
  },
  {
    label:
      "Q.2:Меня интересует этот товар. Когда вы сможете опубликовать больше фотографий этого?",
    value: 2,
  },
  {
    label: "Q.3:Вы сделаете скидку на это?",
    value: 3,
  },
  {
    label: "Q.4:У вас есть система доставки?",
    value: 4,
  },
  {
    label: "Q.5:Do you have english speaking staff?",
    value: 5,
  },
];

function ContactSellerForm({ listing }) {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messagesApi.send(message, listing._id);

    if (result.ok) {
      resetForm();
      return Alert.alert("послал", "Ваше сообщение отправлено продавцу.");
    }

    if (!result.ok) {
      return Alert.alert("Error", "Не удалось отправить сообщение продавцу.");
    }

    resetForm();

    Notifications.presentLocalNotificationAsync({
      title: "послал",
      body: "Ваше сообщение отправлено продавцу!",
      data: {
        _displayInForeground: true,
      },
    });
  };

  return (
    <Form
      initialValues={{ message: null }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Picker
        items={messages}
        name="message"
        numberOfColumns={1}
        PickerItemComponent={CategoryPickerItem}
        placeholder="Сообщение"
        width="100%"
      />
      <SubmitButton title="Связаться с продавцом" />
    </Form>
  );
}

const validationSchema = Yup.object().shape({
  message: Yup.object().required().nullable().label("Message"),
});

export default ContactSellerForm;
