import React, { useState, useContext } from "react";
import { StyleSheet, Image, Button, View, Text } from "react-native";
import * as Yup from "yup";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import { LocaleContext } from "../locales/index.js";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import usersApi from "../api/users";
import useApi from "../hooks/useApi";

const validationSchema = Yup.object().shape({
  contact: Yup.number().required("Phone required").label("Phone"),
  password: Yup.string()
    .required("Пароль - обязательное поле")
    .min(4, "Пароль должен быть действующим.")
    .label("Password"),
});

function LoginScreen({ navigation }) {
  const resendApi = useApi(usersApi.resend);
  const resetpasswordApi = useApi(usersApi.resetpassword);
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginError, setLoginError] = useState([]);
  const [loginStatus, setLoginStatus] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async ({ password, contact }) => {
    const result = await authApi.login(password, contact);

    if (!result.ok)
      return (
        setLoginFailed(true) &
        setLoginError(result.data) &
        setLoginStatus(result.status) &
        setUsername({ username, password, contact })
      );
    setLoginFailed(false);
    auth.logIn(result.data);
  };

  const forgotPassword = async (value) => {
    const result = await resetpasswordApi.request(value);
    if (!result.ok) return setLoginError(result.data);
    navigation.navigate(routes.RESETPASSWORD, value);
  };

  const resendOtp = async (value) => {
    const result = await resendApi.request(value);
    if (!result.ok) return setLoginError(result.data);
    navigation.navigate(routes.VERIFICATION, value);
  };

  const { strings } = useContext(LocaleContext);

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-blue.png")} />
      <Form
        initialValues={{ password: "", contact: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={loginError} visible={loginFailed} />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          keyboardType="number-pad"
          name="contact"
          placeholder={strings.PhoneNumber}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder={strings.Password}
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title={strings.Login} />
        <View style={styles.containerButton}>
          <View style={styles.detailsContainer}>
            {loginStatus === 402 && (
              <Button
                title="Forgot Password"
                onPress={() => forgotPassword(username)}
                style={styles.button}
              />
            )}
          </View>
          <View style={styles.detailsContainer}>
            {loginStatus === 401 && (
              <Button
                title="Resend OTP"
                style={styles.button}
                onPress={() => resendOtp(username)}
              />
            )}
          </View>
        </View>
      </Form>
      {/* <View style={styles.containerButton}>
        <View style={styles.detailsContainer}>
          {loginStatus === 402 && (
            <Button
              title="Forgot Password"
              onPress={forgotPassword}
              style={styles.button}
            />
          )}
        </View>
        <View style={styles.detailsContainer}>
          {loginStatus === 401 && (
            <Button
              title="Resend OTP"
              onPress={resendOtp}
              style={styles.button}
            />
          )}
        </View>
      </View> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  button: {
    marginVertical: 5,
    textAlign: "left",
  },
  containerButton: {
    alignItems: "center",
    flexDirection: "row",
  },
  detailsContainer: {
    flex: 1,
  },
});

export default LoginScreen;
