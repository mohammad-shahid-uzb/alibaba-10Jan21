import React, { useState } from "react";
import { useFormikContext, Formik } from "formik";
import { Text, StyleSheet } from "react-native";
import * as Yup from "yup";
import colors from "../config/colors";
import Screen from "../components/Screen";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";
import authApi from "../api/auth";
import usersApi from "../api/users";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Добавьте название password")
    .min(4)
    .max(12, "Максимум слов 12")
    .matches(/[a-z]/, "at least one lowercase char")
    .label("Password"),
  retype: Yup.string()
    .required("Добавьте название password")
    .min(4)
    .max(12, "Максимум слов 12")
    .matches(/[a-z]/, "at least one lowercase char")
    .label("Password"),
});

function ResetPasswordScreen({ navigation, route }) {
  const resetpasswordApi = useApi(usersApi.resetpassword);
  const resendApi = useApi(usersApi.resend);
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginError, setLoginError] = useState([]);

  const handleSubmit = async (values) => {
    if (values.password === values.retype) {
      const result = await resetpasswordApi.request(values);
      if (!result.ok) return setLoginError(result.data) & setLoginFailed(true);
      const resultotp = await resendApi.request(values);
      if (!resultotp.ok) return setLoginError(resultotp.data);
      navigation.navigate(routes.VERIFICATION, values);
    } else {
      return setLoginError("Both Field Should be same") & setLoginFailed(true);
    }
  };

  return (
    <>
      <Screen style={styles.screen}>
        <Text style={styles.header}>Reset Password</Text>
        <Text style={styles.tag}>Please enter new pasword !</Text>
        <Form
          initialValues={{
            password: "",
            retype: "",
            contact: route.params.contact,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormField
            maxLength={12}
            name="password"
            placeholder="Password"
            autoCapitalize="none"
          />
          <FormField
            maxLength={12}
            name="retype"
            placeholder="Retype"
            autoCapitalize="none"
          />
          <ErrorMessage error={loginError} visible={loginFailed} />
          <SubmitButton title="Save" />
        </Form>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.baseColor1,
  },
  header: {
    alignItems: "center",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  tag: {
    alignItems: "center",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
  },
});

export default ResetPasswordScreen;
