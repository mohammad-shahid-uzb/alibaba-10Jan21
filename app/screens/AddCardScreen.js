import React, { useState, useContext } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import colors from "../config/colors";
import {
  Form,
  FormFieldCard,
  SubmitButton,
  FormFieldCardMonth,
} from "../components/forms";
import addCardApi from "../api/addcard";
import UploadScreen from "./UploadScreen";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";
import { LocaleContext } from "../locales/index.js";

const validationSchema = Yup.object().shape({
  cardnumber: Yup.number()
    .required("Обязательное поле Номер карточки")
    .min(16, "минимальная цифра 16")
    .label("Номер карточки должен быть номер"),
  expire: Yup.string()
    .required("Обязательное поле срок месяц")
    .min(5, "минимальная цифра mm/yy")
    .label("Номер карточки должен быть номер"),
});

function AddCardScreen({ navigation }) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();
  const userId = user._id;

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(false);
    const expire = listing.expire.replace(/\\|\//g, "");
    const number = listing.cardnumber.replace(/\s+/g, "");

    const result = await addCardApi.cardSave(
      {
        id: 123,
        method: "cards.create",
        params: {
          card: { number: number, expire: expire },
          save: true,
        },
      },
      (progress) => setProgress(progress)
    );
    const tokenF = result.data.result.card.token;
    if (!result.ok) {
      setUploadVisible(false);
      return alert("Не удалось сохранить . Пожалуйста, попробуйте еще раз.");
    } else {
      // resetForm();
      const result = await addCardApi.verifyCard({
        id: 123,
        method: "cards.get_verify_code",
        params: {
          token: tokenF,
        },
      });
      if (!result.ok) {
        setUploadVisible(false);
        return alert("Не удалось сохранить . Пожалуйста, попробуйте еще раз.");
      } else {
        navigation.navigate(routes.CARDVERIFICATION, { tokenF, userId });
        return alert("Объявление успешно создано");
      }
    }
  };
  const { strings } = useContext(LocaleContext);

  return (
    <Screen style={styles.screen}>
      <ScrollView>
        <View>
          <UploadScreen
            onDone={() => setUploadVisible(false)}
            progress={progress}
            visible={uploadVisible}
          />
          <Form
            initialValues={{
              cardnumber: "",
              expire: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <View style={styles.cardTop}>
              <Text style={styles.Text}>{strings.disclaimerCard}</Text>
            </View>
            <FormFieldCard
              keyboardType="numeric"
              maxLength={20}
              minLength={16}
              name="cardnumber"
              placeholder={strings.CardNumber}
            />
            <View style={styles.container}>
              <View style={styles.containersm}>
                <FormFieldCardMonth
                  keyboardType="numeric"
                  maxLength={5}
                  minLength={5}
                  name="expire"
                  placeholder={strings.CardExpire}
                />
              </View>
            </View>
            <SubmitButton title={strings.SaveCard} />
          </Form>
        </View>
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 6,
    backgroundColor: colors.grey,
  },
  cardTop: {
    backgroundColor: colors.bgTopWhite,
    overflow: "hidden",
    width: "100%",
    padding: 10,
    margin: 0,
  },
  Text: {
    fontSize: 14,
  },
  container: {
    flexDirection: "row",
  },
  containersm: {
    width: "50%",
  },
});
export default AddCardScreen;
