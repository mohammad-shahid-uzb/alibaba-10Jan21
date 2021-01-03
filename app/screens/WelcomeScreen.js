import React, { useContext } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import Button from "../components/Button";
import routes from "../navigation/routes";
import { LocaleContext } from "../locales/index.js";

function WelcomeScreen({ navigation }) {
  const { strings, setLanguage } = useContext(LocaleContext);

  return (
    <>
      <ImageBackground
        blurRadius={0.1}
        style={styles.background}
        source={require("../assets/background.png")}
      >
        <TouchableOpacity onPress={() => setLanguage("ru")}>
          <Text style={{ fontSize: 20, color: "#fff" }}>Rus</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLanguage("en")}>
          <Text style={{ fontSize: 20, color: "#fff" }}>Eng</Text>
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          <Button
            title={strings.Login}
            onPress={() => navigation.navigate(routes.LOGIN)}
          />
          <Button
            title={strings.Register}
            color="secondary"
            onPress={() => navigation.navigate(routes.REGISTER)}
          />
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 17,
    fontWeight: "600",
    paddingVertical: 10,
  },
});

export default WelcomeScreen;
