import React, { useState } from "react";
import { useFormikContext } from "formik";
import { Text, StyleSheet } from "react-native";
import * as Yup from "yup";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { Form, FormField, ErrorMessage } from "../components/forms";
import useAuth from "../auth/useAuth";
import usersApi from "../api/users";
import authApi from "../api/auth";
import useApi from "../hooks/useApi";

const validationSchema = Yup.object().shape({
  secretcode: Yup.number()
    .required("Добавьте название продукта")
    .min(4)
    .max(4, "Максимум слов 4")
    .label("Token"),
});

function VerificationFormScreen({ route }) {
  const AutoSubmitToken = ({ userInfo }) => {
    const [loginFailed, setLoginFailed] = useState(false);
    const [loginError, setLoginError] = useState([]);
    const verifyApi = useApi(usersApi.verify);
    const loginApi = useApi(authApi.login);
    const auth = useAuth();
    // Grab values and submitForm from context
    const { values } = useFormikContext();
    const submitForm = async (values) => {
      const result = await verifyApi.request(values);
      if (!result.ok) return setLoginError(result.data) & setLoginFailed(true);
      setLoginFailed(false);
      const { data: authToken } = await loginApi.request(
        userInfo.params.password,
        userInfo.params.contact
      );
      auth.logIn(authToken);
    };
    React.useEffect(() => {
      // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
      if (values.secretcode.length === 4) {
        submitForm(values);
      }
    }, [values]);
    return <ErrorMessage error={loginError} visible={loginFailed} />;
  };
  return (
    <>
      <Screen style={styles.screen}>
        <Text style={styles.header}>2-step Verification</Text>
        <Text style={styles.tag}>
          Please enter the 4 digit code sent to your device
        </Text>
        <Form
          initialValues={{
            secretcode: "",
            contact: route.params.contact,
            password: route.params.password,
          }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
          validationSchema={validationSchema}
        >
          <FormField maxLength={4} name="secretcode" placeholder="Заголовок" />
          <AutoSubmitToken userInfo={route} />
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

export default VerificationFormScreen;
