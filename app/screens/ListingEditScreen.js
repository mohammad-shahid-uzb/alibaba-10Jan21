import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import colors from "../config/colors";

import {
  Form,
  FormField,
  FormPicker as Picker,
  FormPicker2 as Picker2,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import listingsApi from "../api/listings";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Добавьте название продукта")
    .min(1)
    .max(200, "Максимум слов 200")
    .label("Title"),
  price: Yup.number()
    .required("Добавить цену")
    .min(1)
    .max(100000000, "Максимальная цена 100000000")
    .label("Price"),
  qty: Yup.number()
    .required("Добавьте доступное количество")
    .min(1)
    .max(100, "Максимум Количество 100")
    .label("Qty"),
  unit: Yup.string()
    .required("Добавить единицу цены")
    .min(1)
    .max(100, "Максимум слов 100")
    .label("Unit"),
  description: Yup.string()
    .min(1)
    .required("Требуется описание")
    .max(500, "Максимум слов 500")
    .label("Description"),
  category: Yup.object()
    .required("Выберите категорию")
    .nullable()
    .label("Category"),
  subcategory: Yup.object()
    .required("Выберите подкатегорию")
    .nullable()
    .label("SubCategory"),
  images: Yup.array()
    .min(2, "Пожалуйста, выберите как минимум две фотографии.")
    .max(2, "Вы можете выбрать максимум две фотографии"),
});

const items = [
  {
    backgroundColor: "#fc5c65",
    icon: "hat-fedora",
    label: "Одежда и аксессуары",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "human-female",
    label: "Женщины",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "human-male",
    label: "мужской",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "car",
    label: "Автомобили",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "magnify",
    label: "Красота и Здоровье",
    value: 5,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "cellphone-iphone",
    label: "телефоны",
    value: 6,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "laptop",
    label: "Компьютер",
    value: 7,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "warehouse",
    label: "Строительные материалы",
    value: 8,
  },
  {
    backgroundColor: "#a55eea",
    icon: "switch",
    label: "Электронные компоненты",
    value: 9,
  },
  {
    backgroundColor: "#fc5c65",
    icon: "food",
    label: "Еда",
    value: 10,
  },
  {
    backgroundColor: "#fed330",
    icon: "sofa",
    label: "Мебель",
    value: 11,
  },
  {
    backgroundColor: "#778ca3",
    icon: "lighthouse",
    label: "Дом и Сад",
    value: 12,
  },
  {
    backgroundColor: "#778ca3",
    icon: "washing-machine",
    label: "Бытовая техника",
    value: 13,
  },
  {
    backgroundColor: "#778ca3",
    icon: "necklace",
    label: "Украшения и аксессуары",
    value: 14,
  },
  {
    backgroundColor: "#778ca3",
    icon: "human-female-boy",
    label: "Мать и дети",
    value: 15,
  },
  {
    backgroundColor: "#778ca3",
    icon: "shoe-heel",
    label: "обувь",
    value: 16,
  },
  {
    backgroundColor: "#778ca3",
    icon: "toolbox",
    label: "инструменты",
    value: 17,
  },
  {
    backgroundColor: "#778ca3",
    icon: "football",
    label: "Игрушки",
    value: 18,
  },
  {
    backgroundColor: "#778ca3",
    icon: "gender-male-female",
    label: "нижняя одежда",
    value: 19,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "cast-education",
    label: "Образование и офис",
    value: 20,
  },
];

function ListingEditScreen(props) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing({ ...listing }, (progress) =>
      setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert(
        "Не удалось сохранить объявление. Пожалуйста, попробуйте еще раз."
      );
    } else {
      resetForm();
      return alert("Объявление успешно создано");
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
            initialValues={{
              title: "",
              price: "",
              qty: "",
              unit: "",
              description: "",
              category: {
                label: "Категория",
              },
              subcategory: null,
              images: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormImagePicker name="images" />
            <FormField maxLength={255} name="title" placeholder="Заголовок" />
            <FormField
              maxLength={120}
              name="unit"
              placeholder="Единица"
              width={190}
            />
            <FormField
              keyboardType="numeric"
              maxLength={20}
              name="price"
              placeholder="Цена"
              width={190}
            />
            <FormField
              keyboardType="numeric"
              maxLength={8}
              name="qty"
              placeholder="Kоличество"
              width={190}
            />
            <FormField
              maxLength={255}
              multiline
              name="description"
              numberOfLines={3}
              placeholder="Описания"
            />
            <Picker
              items={items}
              name="category"
              name2="subcategory"
              PickerItemComponent={CategoryPickerItem}
              placeholder="Категория"
              width="100%"
            />
            <Picker2
              name="subcategory"
              PickerItemComponent={CategoryPickerItem}
              placeholder="Подкатегория"
              width="100%"
            />
            <SubmitButton title="Обнародовать" />
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
});
export default ListingEditScreen;
