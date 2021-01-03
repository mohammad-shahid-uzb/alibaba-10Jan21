import client from "./client";

const endpoint = "/messages";

const getMessages = () => client.get(endpoint);
const deleteMessages = (id) => client.delete(endpoint + "/" + id);

const send = (message, listingId) =>
  client.post("/messages", {
    message,
    listingId,
  });

const resend = (message, id, listingId) =>
  client.post("/messages/reply", {
    message,
    id,
    listingId,
  });

export default {
  send,
  resend,
  getMessages,
  deleteMessages,
};
