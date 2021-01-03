import client from "./client";

const login = (password, contact) =>
  client.post("/auth", { password, contact });

export default {
  login,
};
