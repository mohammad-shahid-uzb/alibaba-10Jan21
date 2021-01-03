import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "cardToken";

const storeCardToken = async (cardToken) => {
  try {
    await SecureStore.setItemAsync(key, cardToken);
  } catch (error) {
    console.log("Error storing the card token", error);
  }
};

const getCardToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the card token", error);
  }
};

const getCard = async () => {
  const token = await getCardToken();
  return token ? jwtDecode(token) : null;
};

const removeCardToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the card token", error);
  }
};

export default { getCardToken, getCard, removeCardToken, storeCardToken };
