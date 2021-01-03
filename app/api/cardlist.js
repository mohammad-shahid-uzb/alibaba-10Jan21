import client from "./client";
const endpoint = "/cards";

const addTokens = (value) => client.post(endpoint + "/add", value);
const getCards = (userId) => client.post(endpoint + "/list", userId);
const deleteCards = (token) => client.post(endpoint + "/remove", token);

export default {
  getCards,
  deleteCards,
  addTokens,
};
