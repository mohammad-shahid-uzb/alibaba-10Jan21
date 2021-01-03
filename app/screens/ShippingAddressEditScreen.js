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
import shippingApi from "../api/shippingAddress";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";
import useAuth from "../auth/useAuth";
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
  street: Yup.string()
    .required("Напишите свой почтовый Улица")
    .min(5, "Почтовый Улица должен состоять не менее чем из 5 символов.")
    .max(200, "Максимум слов 200"),
  house: Yup.string()
    .required("Напишите свой почтовый  дом номер.")
    .min(1, "Почтовый дом номер должен состоять не менее чем из 1 символов.")
    .max(6, "Максимум слов 6"),
  flatNo: Yup.string()
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
  pincode: Yup.string()
    .required("Почтовый индекс - обязательное поле")
    .min(6, "Почтовый индекс должен состоять не менее чем из 6 символов.")
    .max(20, "Максимум слов 20"),
  email: Yup.string().email(),
  userId: Yup.string().required(true),
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

function ShippingAddressEditScreen({ navigation, route }) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const retrivedData = route.params;
  const { user } = useAuth();

  const handleSubmit = async (listing, { resetForm }) => {
    listing.address = {
      flatNo: listing.flatNo,
      street: listing.street,
      district: listing.district.label,
      city: listing.city.label,
      country: listing.country.label,
      pincode: listing.pincode,
    };

    setProgress(0);
    setUploadVisible(true);

    if (listing.listingId) {
      const updateData = listing;
      const result = await shippingApi.updateShippingAddress(
        { ...updateData },
        (progress) => setProgress(progress)
      );
      if (!result.ok) {
        setUploadVisible(false);
        return alert("Не удалось сохранить . Пожалуйста, попробуйте еще раз.");
      } else {
        resetForm();
        const userId = user._id;
        const response = await shippingApi.getShippingAddress({ userId });
        navigation.navigate(routes.SHIPPING, { userId });
        return alert("Объявление успешно создано");
      }
    } else {
      const result = await shippingApi.addShippingaddress(
        { ...listing },
        (progress) => setProgress(progress)
      );
      if (!result.ok) {
        setUploadVisible(false);
        return alert("Не удалось сохранить . Пожалуйста, попробуйте еще раз.");
      } else {
        resetForm();
        const userId = user._id;
        const response = await shippingApi.getShippingAddress({ userId });
        //console.log("response ", response.data);
        const listings = response.data;
        navigation.navigate(routes.SHIPPING, { userId });
        return alert("Объявление успешно создано");
      }
    }
  };

  const location = useLocation();
  // console.log("location ", location);

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
                    // name: route.params.name,
                    // phone: route.params.phone,
                    // street: route.params.address.street,
                    // house: route.params.address.house,
                    // flatNo: route.params.address.flatNo,
                    // email: route.params.email,
                    // userId: user._id,
                    // listingId: route.params._id,
                  }
                : {
                    name: "",
                    phone: "",
                    email: "",
                    userId: user._id,
                    street: "",
                    house: "",
                    flatNo: "",
                    country: {
                      label: "страна",
                    },
                    city: {
                      label: "город",
                    },
                    district: {
                      label: "района",
                    },
                    pincode: "",
                  }
            }
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <View style={styles.cardTop}>
              <Text style={styles.Text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </Text>
            </View>
            <FormField
              maxLength={255}
              name="name"
              placeholder="Контактное лицо"
            />
            <FormField
              keyboardType="phone-pad"
              maxLength={20}
              name="phone"
              placeholder="мобильный номер"
            />
            <FormField maxLength={120} name="email" placeholder="email" />
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
                  name="flatNo"
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
              name="pincode"
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
export default ShippingAddressEditScreen;
