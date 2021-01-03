import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import shopApi from "../api/shopProfile";
import { LocaleContext } from "../locales/index";

function AccountScreen({ navigation, value = 1 }) {
  const { user, logOut } = useAuth();

  const [listings, setListings] = useState([]);

  const userId = user._id;

  useEffect(() => {
    loadListings();
  }, [value]);

  const loadListings = async () => {
    const response = await shopApi.getListings({ userId });
    setListings(response.data);
    return () => {
      response.remove();
    };
  };
  const { strings } = useContext(LocaleContext);

  const menuItems = [
    {
      title: strings.MyListings,
      icon: {
        name: "format-list-bulleted",
        backgroundColor: colors.primary,
      },
      targetScreen: routes.LISTINGS,
    },
    {
      title: strings.MyMessages,
      icon: {
        name: "email",
        backgroundColor: colors.secondary,
      },
      targetScreen: routes.MESSAGES,
    },
    {
      title: strings.MyOrdersList,
      icon: {
        name: "matrix",
        backgroundColor: colors.secondary,
      },
      targetScreen: routes.ORDERLIST,
    },
  ];

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        {user.isAdmin === true ? (
          <ListItem
            title={user.fname}
            subTitle={user.contact}
            image={require("../assets/shah.jpg")}
            onPress={() =>
              navigation.navigate(routes.SHOPROFILE, { user, listings })
            }
          />
        ) : (
          <ListItem
            title={user.fname}
            subTitle={user.contact}
            image={require("../assets/shah.jpg")}
            onPress={() => navigation.navigate(routes.USERROFILE, user)}
          />
        )}
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title={strings.Logout}
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
