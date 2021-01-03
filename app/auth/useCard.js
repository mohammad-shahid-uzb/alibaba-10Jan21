import { useContext } from "react";
import jwtDecode from "jwt-decode";

import CardContext from "./context";
import cardStorage from "./cardstorage";

export default useCard = () => {
  const { card, setCard } = useContext(CardContext);

  const cardSave = (cardToken) => {
    const card = jwtDecode(cardToken);

    setCard(card);
    cardStorage.storeToken(cardToken);
  };

  const removeCard = () => {
    setCard(null);
    cardStorage.removeToken();
  };

  return { card, cardSave, removeCard };
};
