import React, { useState, useContext } from "react";
import { useFormikContext } from "formik";
import { Text, StyleSheet } from "react-native";
import * as Yup from "yup";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { Form, FormField, ErrorMessage } from "../components/forms";
import addCardApi from "../api/addcard";
import addTokensApi from "../api/cardlist";
import routes from "../navigation/routes";
import { LocaleContext } from "../locales/index.js";

const validationSchema = Yup.object().shape({
  secretcode: Yup.number()
    .required("Добавьте название продукта")
    .min(6)
    .max(6, "Максимум слов 4")
    .label("Token"),
});

function cardVerificationScreen({ navigation, route }) {
  const AutoSubmitToken = ({ userInfo }) => {
    const [loginFailed, setLoginFailed] = useState(false);
    const [loginError, setLoginError] = useState([]);

    // Grab values and submitForm from context
    const { values } = useFormikContext();
    const submitForm = async (values) => {
      const result = await addCardApi.verifyToken({
        id: 123,
        method: "cards.verify",
        params: {
          token: userInfo.params.tokenF,
          code: values.secretcode,
        },
      });

      if (!result.ok)
        return setLoginError("not verified") & setLoginFailed(true);
      setLoginFailed(false);

      const resultAddCard = await addTokensApi.addTokens({
        userId: userInfo.params.userId,
        token: userInfo.params.tokenF,
      });
      if (!resultAddCard.ok)
        return setLoginError("card not saved") & setLoginFailed(true);
      setLoginFailed(false);
      navigation.navigate(routes.CARDLIST, resultAddCard.data);
    };

    React.useEffect(() => {
      // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
      if (values.secretcode.length === 6) {
        submitForm(values);
      }
    }, [values]);
    return <ErrorMessage error={loginError} visible={loginFailed} />;
  };
  const { strings } = useContext(LocaleContext);

  return (
    <>
      <Screen style={styles.screen}>
        <Text style={styles.header}>{strings.Verification}</Text>
        <Text style={styles.tag}>{strings.Entercode}</Text>
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
          <FormField maxLength={6} name="secretcode" placeholder="Заголовок" />
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

export default cardVerificationScreen;
