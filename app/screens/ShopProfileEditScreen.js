import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import colors from "../config/colors";
import {
  Form,
  FormField,
  SubmitButton,
  FormPicker as Picker,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import shopApi from "../api/shopProfile";
import useAuth from "../auth/useAuth";
import UploadScreen from "./UploadScreen";
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Имя - обязательное поле")
    .min(2, "Имя должно содержать не менее 2 символов")
    .max(200, "Максимум слов 200")
    .label("Contact Name"),
  phone: Yup.string()
    .required("Телефон обязательное поле")
    .min(9, "Контакт должен состоять не менее чем из 9 символов.")
    .max(20, "Максимум слов 20"),
  directorName: Yup.string(),
  directorPassport: Yup.string(),
  street: Yup.string()
    .required("Напишите свой почтовый Улица")
    .min(5, "Почтовый Улица должен состоять не менее чем из 5 символов.")
    .max(200, "Максимум слов 200"),
  house: Yup.string()
    .required("Напишите свой почтовый  дом номер.")
    .min(1, "Почтовый дом номер должен состоять не менее чем из 1 символов.")
    .max(6, "Максимум слов 6"),
  flat: Yup.string()
    .required("Напишите свой почтовый  квартиры номер.")
    .min(
      1,
      "Почтовый квартиры номер должен состоять не менее чем из 1 символов."
    )
    .max(6, "Максимум слов 6"),
  country: Yup.string()
    .required("Страна")
    .min(2, "Почтовый Страна должен состоять не менее чем из 2 символов.")
    .max(200, "Максимум слов 200"),
  city: Yup.string()
    .required("Напишите название вашего города")
    .min(4, "Почтовый города должен состоять не менее чем из 4 символов.")
    .max(200, "Максимум слов 200"),
  district: Yup.string()
    .required("Напишите название вашего района")
    .min(4, "Почтовый района должен состоять не менее чем из 4 символов.")
    .max(80, "Максимум слов 80"),
  postalcode: Yup.string()
    .required("Почтовый индекс - обязательное поле")
    .min(6, "Почтовый индекс должен состоять не менее чем из 6 символов.")
    .max(20, "Максимум слов 20"),
  registrationNumber: Yup.string(),
  ennNumber: Yup.string(),
  vatNumber: Yup.string(),
  contactNumber: Yup.string(),
  email: Yup.string(),
  userId: Yup.string(),
  merchantId: Yup.string(),
  listingId: Yup.string(),
});

const country = [
  {
    label: "Uzbekistan",
    value: 1,
  },
];
const city = [
  {
    label: "Tashkent",
    value: 1,
  },
  {
    label: "Bukhara",
    value: 2,
  },
];
const district = [
  {
    label: "shaikankour",
    value: 1,
  },
  {
    label: "Younusbad",
    value: 2,
  },
];

function ShopProfileEditScreen({ navigation, route }) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const retrivedData = route.params;
  const { user } = useAuth();
  const handleSubmit = async (listing, { resetForm }) => {
    listing.officeAddress =
      listing.flat +
      "/" +
      listing.house +
      ", " +
      listing.street +
      ", " +
      listing.district.label +
      ", " +
      listing.city.label +
      ", " +
      listing.country.label +
      ", " +
      listing.postalcode;
    setProgress(0);
    setUploadVisible(true);
    if (listing.listingId) {
      const updateData = listing;
      const result = await shopApi.updateListing(
        { ...updateData },
        (progress) => setProgress(progress)
      );

      if (!result.ok) {
        setUploadVisible(false);
        return alert("Не удалось сохранить . Пожалуйста, попробуйте еще раз.");
      } else {
        resetForm();
        const userId = user._id;
        const response = await shopApi.getListings({ userId });
        const listings = response.data;
        navigation.navigate(routes.SHOPROFILE, { user, listings });
        return alert("Объявление успешно создано");
      }
    } else {
      const result = await shopApi.addListing({ ...listing }, (progress) =>
        setProgress(progress)
      );
      if (!result.ok) {
        setUploadVisible(false);
        return alert("Не удалось сохранить . Пожалуйста, попробуйте еще раз.");
      } else {
        resetForm();
        const userId = user._id;
        const response = await shopApi.getListings({ userId });
        const listings = response.data;
        navigation.navigate(routes.SHOPROFILE, { user, listings });
        return alert("Объявление успешно создано");
      }
    }
  };

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
            initialValues={
              retrivedData !== undefined
                ? {
                    name: user.fname,
                    phone: user.contact,
                    email: route.params.listings.email,
                    userId: user._id,
                    street: route.params.listings.street,
                    house: route.params.listings.house,
                    flat: route.params.listings.flatNo,
                    country: route.params.listings.country,
                    city: route.params.listings.city,
                    district: route.params.listings.district,
                    postalcode: route.params.listings.postalcode,
                    directorName: route.params.listings.directorName,
                    directorPassport: route.params.listings.directorPassport,
                    registrationNumber:
                      route.params.listings.registrationNumber,
                    ennNumber: route.params.listings.ennNumber,
                    vatNumber: route.params.listings.vatNumber,
                    contactNumber: route.params.listings.contactNumber,
                    merchantId: route.params.listings.merchantId,
                    listingId: route.params.listings._id,
                  }
                : {
                    city: {
                      label: "город",
                    },
                    contactNumber: "",
                    country: {
                      label: "страна",
                    },
                    directorName: "",
                    directorPassport: "",
                    district: {
                      label: "района",
                    },
                    email: "",
                    ennNumber: "",
                    flat: "",
                    house: "",
                    merchantId: "",
                    name: user.fname,
                    phone: user.contact,
                    postalcode: "",
                    registrationNumber: "",
                    street: "",
                    userId: user._id,
                    vatNumber: "",
                  }
            }
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize={true}
          >
            <View style={styles.cardTop}>
              <Text style={styles.Text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </Text>
            </View>
            <FormField
              maxLength={255}
              name="contactname"
              placeholder="Контактное лицо"
              value={user.fname}
            />
            <FormField
              keyboardType="phone-pad"
              maxLength={20}
              name="phone"
              placeholder="мобильный номер"
              value={user.contact}
            />
            <FormField
              maxLength={50}
              name="email"
              placeholder="электронный ид"
            />
            <FormField
              maxLength={50}
              name="directorName"
              placeholder="Имя директора"
            />
            <FormField
              maxLength={50}
              name="directorPassport"
              placeholder="директор Паспорт"
            />
            <FormField
              maxLength={20}
              name="registrationNumber"
              placeholder="регистрационный номер"
            />
            <FormField
              maxLength={50}
              name="ennNumber"
              placeholder="Номер ENN"
            />
            <FormField
              maxLength={50}
              name="vatNumber"
              placeholder="Номер НДС"
            />
            <FormField
              maxLength={50}
              name="contactNumber"
              placeholder="Контактный телефон"
            />
            <FormField
              maxLength={50}
              name="merchantId"
              placeholder="идентификатор продавца"
            />
            <FormField maxLength={255} name="street" placeholder="Улица" />
            <View style={styles.container}>
              <View style={styles.containersm}>
                <FormField
                  keyboardType="numeric"
                  maxLength={20}
                  name="house"
                  placeholder="дом номер"
                />
              </View>
              <View style={styles.containersm}>
                <FormField
                  keyboardType="numeric"
                  maxLength={20}
                  name="flat"
                  placeholder="квартиры номер"
                />
              </View>
            </View>
            <Picker
              items={country}
              name="country"
              PickerItemComponent={CategoryPickerItem}
              placeholder="страна"
              width="100%"
              numberOfColumns={1}
            />
            <Picker
              items={city}
              name="city"
              PickerItemComponent={CategoryPickerItem}
              placeholder="город"
              width="100%"
            />
            <Picker
              items={district}
              name="district"
              PickerItemComponent={CategoryPickerItem}
              placeholder="района"
              width="100%"
            />
            <FormField
              keyboardType="numeric"
              maxLength={20}
              name="postalcode"
              placeholder="Почтовый индекс"
            />
            <SubmitButton title="Сохранить" />
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
    width: "47%",
    marginLeft: 7,
  },
});
export default ShopProfileEditScreen;
