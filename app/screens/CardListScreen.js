import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableHighlight,
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import {
  ListItemSeparator,
  ListItemDeleteAction,
  CardListItem,
} from "../components/lists";
import { EvilIcons } from "@expo/vector-icons";
import SelectedCard from "../components/SelectedCard";
import routes from "../navigation/routes";
import cardsApi from "../api/cardlist";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import { LocaleContext } from "../locales/index.js";

const CardListScreen = ({ navigation, route }) => {
  const getcardsApi = useApi(cardsApi.getCards);
  const [cardData, setCardData] = useState([]);
  const [card, setCard] = useState([]);

  const { user } = useAuth();
  const userId = user._id;
  const car = route.params;

  useEffect(() => {
    getCards(userId);
  }, [car]);

  const getCards = async (userId) => {
    const result = await getcardsApi.request({ userId });
    setCardData(result.data);
    return () => {
      result.remove();
    };
  };

  useEffect(() => {
    chooseCardNumber();
  }, [setCard]);

  const chooseCardNumber = (token) => {
    var newArr = cardData.map((d) => {
      if (d.token === token) {
        d.inCart = true;
        setCard(d);
        return d;
      }
      {
        d.inCart = false;
        return d;
      }
    });
    setCardData(newArr);
  };
  const selectCard = {
    paymentType: route.params,
    card,
  };

  const handleDelete = async (item) => {
    const userId = user._id;
    const token = item.token;
    const result = await cardsApi.deleteCards({ token, userId });

    if (!result.ok) return;
    const resultCard = await getcardsApi.request({ userId });
    setCardData(resultCard.data);
  };
  const { strings } = useContext(LocaleContext);

  return (
    <>
      <Screen>
        <ActivityIndicator visible={getcardsApi.loading} />
        {cardData.length > 0 ? (
          <FlatList
            data={cardData}
            keyExtractor={(listing, index) => index.toString()}
            renderItem={({ item }) => (
              <>
                <View style={styles.containerTop}>
                  <TouchableHighlight underlayColor={colors.light}>
                    <View style={styles.containersm}>
                      <SelectedCard
                        item={item}
                        onPress={() => chooseCardNumber(item.token)}
                      />
                      <View style={styles.icon}>
                        <EvilIcons
                          name="credit-card"
                          size={40}
                          color="#147EFB"
                        />
                      </View>
                      <View style={styles.detailsContainer}>
                        <CardListItem
                          title={item.number}
                          subTitle={item.expire}
                          renderRightActions={() => (
                            <ListItemDeleteAction
                              onPress={() => handleDelete(item)}
                            />
                          )}
                        />
                        <ListItemSeparator />
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              </>
            )}
          />
        ) : (
          <Text style={styles.addcard}></Text>
        )}
      </Screen>
      {card.inCart && (
        <View style={styles.nextButton}>
          <View style={styles.checkoutButtonStyleCard}>
            <TouchableHighlight
              underlayColor={"#72B2FD"}
              onPress={() => navigation.navigate(routes.ORDER, selectCard)}
            >
              <Text style={styles.textButton}>{strings.Order}</Text>
            </TouchableHighlight>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  appText: {
    alignItems: "center",
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
  },
  containerTop: {
    margin: 5,
  },
  containersm: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  nextButton: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
    width: "100%",
  },
  checkoutButtonStyleCard: {
    backgroundColor: "#72B2FD",
    padding: 10,
    borderRadius: 4,
    width: "100%",
  },
  textButton: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    marginTop: 5,
  },
});

export default CardListScreen;
