import React from "react";
import { useFormikContext, Formik } from "formik";
import { Text, StyleSheet } from "react-native";
import * as Yup from "yup";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { Form, FormField } from "../components/forms";
import useAuth from "../auth/useAuth";
import authApi from "../api/auth";

const AutoSubmitToken = ({ userInfo }) => {
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  // Grab values and submitForm from context
  const { values } = useFormikContext();

  const submitForm = async (values) => {
    const { data: authToken } = await loginApi.request(
      userInfo.params.username,
      userInfo.params.password
    );
    auth.logIn(authToken);
  };

  React.useEffect(() => {
    // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
    if (values.token.length === 6) {
      submitForm(values.token);
    }
  }, [values]);
  return null;
};

const validationSchema = Yup.object().shape({
  contact: Yup.number()
    .required("Добавьте название продукта")
    .min(9)
    .max(9, "Максимум слов 9")
    .label("Phone"),
});

function ResendOtpScreen({ route }) {
  return (
    <>
      <Screen style={styles.screen}>
        <Text style={styles.header}>Mobile Number</Text>
        <Text style={styles.tag}>
          Please enter your phone number used for this account earlier
        </Text>
        <Form
          initialValues={{
            contact: "",
          }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
          validationSchema={validationSchema}
        >
          <FormField
            maxLength={9}
            name="contact"
            placeholder="Contact Number"
          />
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

export default ResendOtpScreen;
