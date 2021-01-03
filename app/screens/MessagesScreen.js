import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import routes from "../navigation/routes";
import messagesApi from "../api/messages";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import {
  ListItem,
  ListItemwithout,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";

function MessagesScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const deleteMessagesApi = useApi(messagesApi.deleteMessages);

  useEffect(() => {
    loadMessages();
  }, [navigation]);

  const loadMessages = async () => {
    const response = await messagesApi.getMessages();
    setMessages(response.data);
  };

  const { user } = useAuth();

  const handleDelete = async (message) => {
    await deleteMessagesApi.request(message._id);
    setMessages(messages.filter((m) => m._id !== message._id));
  };

  return (
    <Screen>
      {user.isAdmin == true ? (
        <FlatList
          data={messages}
          keyExtractor={(listing, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.fromUserName}
              subTitle={item.content}
              onPress={() => navigation.navigate(routes.MESSAGE_DETAILS, item)}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={() => {
            setMessages(messages);
          }}
        />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(listing, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItemwithout
              title={item.fromUserName}
              subTitle={item.content}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={() => {
            setMessages(messages);
          }}
        />
      )}
    </Screen>
  );
}

export default MessagesScreen;
