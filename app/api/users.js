import client from "./client";

const register = (userInfo) => client.post("/usersregister", userInfo);
const verify = (values) => client.post("/usersregister/verifyotp", values);
const resend = (value) => client.put("/usersregister/resend", value);
const resetpassword = (value) =>
  client.put("/usersregister/forgotpassword", value);

export default { register, verify, resend, resetpassword };
