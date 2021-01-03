import React, { useContext } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import Screen from "./Screen";
import { ListItem } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LocaleContext } from "../locales/index.js";

export default function MainCategory({
  size = 40,
  iconColor = "green",
  onPress,
}) {
  const { strings } = useContext(LocaleContext);

  const items = [
    {
      backgroundColor: "#fc5c65",
      icon: "hat-fedora",
      label: strings.Accesories,
      value: 1,
    },
    {
      backgroundColor: "#fd9644",
      icon: "human-female",
      label: strings.Women,
      value: 2,
    },
    {
      backgroundColor: "#fed330",
      icon: "human-male",
      label: strings.Male,
      value: 3,
    },
    {
      backgroundColor: "#26de81",
      icon: "car",
      label: strings.Cars,
      value: 4,
    },
    {
      backgroundColor: "#2bcbba",
      icon: "magnify",
      label: strings.Healthandbeauty,
      value: 5,
    },
    {
      backgroundColor: "#2bcbba",
      icon: "cellphone-iphone",
      label: strings.Telephones,
      value: 6,
    },
    {
      backgroundColor: "#45aaf2",
      icon: "laptop",
      label: strings.Computer,
      value: 7,
    },
    {
      backgroundColor: "#4b7bec",
      icon: "warehouse",
      label: strings.ConstructionMaterial,
      value: 8,
    },
    {
      backgroundColor: "#a55eea",
      icon: "switch",
      label: strings.ElectronicComponents,
      value: 9,
    },
    {
      backgroundColor: "#fc5c65",
      icon: "food",
      label: strings.Food,
      value: 10,
    },
    {
      backgroundColor: "#fed330",
      icon: "sofa",
      label: strings.Furniture,
      value: 11,
    },
    {
      backgroundColor: "#778ca3",
      icon: "cast-education",
      label: strings.Educationandoffice,
      value: 12,
    },
    {
      backgroundColor: "#778ca3",
      icon: "office-building",
      label: strings.Homedecoration,
      value: 13,
    },
    {
      backgroundColor: "#778ca3",
      icon: "washing-machine",
      label: strings.Appliances,
      value: 14,
    },
    {
      backgroundColor: "#778ca3",
      icon: "necklace",
      label: strings.Jewelryandaccessories,
      value: 15,
    },
    {
      backgroundColor: "#778ca3",
      icon: "human-female-boy",
      label: strings.MotherandChildren,
      value: 16,
    },
    {
      backgroundColor: "#778ca3",
      icon: "shoe-heel",
      label: strings.footwear,
      value: 17,
    },
    {
      backgroundColor: "#778ca3",
      icon: "toolbox",
      label: strings.Tools,
      value: 18,
    },
    {
      backgroundColor: "#778ca3",
      icon: "football",
      label: strings.Toys,
      value: 19,
    },
    {
      backgroundColor: "#778ca3",
      icon: "gender-male-female",
      label: strings.Underwear,
      value: 20,
    },
    {
      backgroundColor: "#4b7bec",
      icon: "heart",
      label: strings.WeddingProducts,
      value: 21,
    },
  ];
  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.textheader}>{strings.Category}</Text>
      </View>
      <ScrollView>
        {items.map((item, i) => (
          <ListItem key={i} onPress={() => onPress(item)}>
            <ListItem.Content style={styles.item}>
              <MaterialCommunityIcons
                name={item.icon}
                color={iconColor}
                size={size * 0.7}
              />
              <ListItem.Title style={styles.title} numberOfLines={2}>
                {item.label}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 2,
  },
  item: {
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 13,
  },
  header: {
    padding: 8,
    backgroundColor: "#f39c12",
    marginBottom: 5,
    borderRadius: 4,
  },
  textheader: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
