import React, { useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { LanguageContext } from "../components/LangProvider";
function LanguageApp() {
  const { language, updateLanguage } = useContext(LanguageContext);

  const handleUpdateLanguage = (value) => {
    updateLanguage(value);
  };
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity language={"ru"}onPress={() => handleUpdateLanguage("en")}>
          <Text style={{ marginRight: 10 }}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleUpdateLanguage("ru")}>
          <Text style={{ marginLeft: 10 }}>Russian</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default LanguageApp;
