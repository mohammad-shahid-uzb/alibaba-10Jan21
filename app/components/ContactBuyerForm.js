import React from "react";
import { Alert, Keyboard } from "react-native";
import { Notifications } from "expo";
import * as Yup from "yup";
import { Form, FormField, SubmitButton } from "./forms";
import messagesApi from "../api/messages";

function ContactBuyerForm({ message }) {
  const id = message.fromUserId;
  const listingId = message.listingId;
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messagesApi.resend(message, id, listingId);

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
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <FormField
        maxLength={255}
        multiline
        name="message"
        numberOfLines={3}
        placeholder="Сообщение...."
      />
      <SubmitButton title="Ответить" />
    </Form>
  );
}

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

export default ContactBuyerForm;
