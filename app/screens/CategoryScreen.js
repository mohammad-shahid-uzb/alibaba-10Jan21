import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "../components/Screen";
import MainCategory from "../components/MainCategory";
import SubCategory from "../components/SubCategory";

function CategoryScreen({ navigation }) {
  const [category, setItem] = useState([]);

  return (
    <Screen>
      <>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ backgroundColor: "white", width: "30%" }}>
            <MainCategory onPress={(item) => setItem(item)} />
          </View>
          <View style={{ backgroundColor: "white", width: "70%" }}>
            <SubCategory
              Columns={3}
              value={category.value}
              navigation={navigation}
            />
          </View>
        </View>
      </>
    </Screen>
  );
}

export default CategoryScreen;
