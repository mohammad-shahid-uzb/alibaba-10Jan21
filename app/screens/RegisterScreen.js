import React, { useState } from "react";
import { StyleSheet, Button, Linking, View } from "react-native";
import * as Yup from "yup";
import { setLocale } from "yup";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import usersApi from "../api/users";
import colors from "../config/colors";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";

setLocale({
  mixed: {
    default: "Não é válido",
  },
  number: {
    min: "Deve ser maior que ${min}",
  },
});

const validationSchema = Yup.object().shape({
  fname: Yup.string()
    .required("Имя - обязательное поле")
    .min(2, "Имя должно содержать не менее 2 символов"),
  username: Yup.string()
    .required("Электронная почта - обязательное поле")
    .email("Электронная почта должна быть действующей."),
  contact: Yup.string()
    .required("Телефон - обязательное поле")
    .min(9, "Контакт должен состоять не менее чем из 9 символов."),
  password: Yup.string()
    .required("Пароль - обязательное поле")
    .min(5, "пароль должен состоять не менее чем из 5 символов"),
});

function RegisterScreen({ navigation }) {
  const registerApi = useApi(usersApi.register);
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);
    if (!result.ok) {
      if (result.data) setError(result.data);
      else {
        setError("произошла непредвиденная ошибка.");
      }
      return;
    }
    navigation.navigate(routes.VERIFICATION, userInfo);
  };

  const handleOpenWithLinking = () => {
    Linking.openURL("https://sites.google.com/view/akrosstore/home");
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{ fname: "", username: "", password: "", contact: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCorrect={false}
            icon="account"
            name="fname"
            placeholder="имя"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="username"
            placeholder="Эл. адрес"
            textContentType="emailAddress"
          />
          <FormField
            icon="phone"
            name="contact"
            placeholder="контакт"
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
            dataDetectorTypes="phoneNumber"
            maxLength={14}
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="пароль"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="регистр" />
        </Form>
        <Button
          title="УСЛОВИЯ ЛИЦЕНЗИИ И ИСПОЛЬЗОВАНИЯ"
          onPress={handleOpenWithLinking}
          style={styles.button}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    color: colors.danger,
    marginTop: 2,
    textAlign: "center",
    fontSize: 14,
  },
  button: {
    marginVertical: 10,
  },
  containerButton: {
    alignItems: "center",
    flexDirection: "row",
  },
  detailsContainer: {
    flex: 1,
  },
});

export default RegisterScreen;
