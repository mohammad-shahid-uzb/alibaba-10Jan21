import cardclient from "./cardclient";

const cardSave = (card) => cardclient.post("/", card);
const verifyCard = (token) => cardclient.post("/", token);
const verifyToken = (token) => cardclient.post("/", token);
const checkCard = (check) => cardclient.post("/", check);

export default {
  cardSave,
  verifyCard,
  verifyToken,
  checkCard,
};
