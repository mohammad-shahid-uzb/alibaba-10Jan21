import client from "./client";
const endpoint = "/orders/place";
const secondEndpoint = "/orders/ordersByUserId";
const updateEndpoint = "/orders/updateOrderStatus";

const getOrder = (userId) => client.post(secondEndpoint, { userId });
const deleteListings = (id) => client.delete(endpoint + "/" + id);

export const addOrders = (order, onUploadProgress) => {
  return client.post(endpoint, order, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export const updateOrders = (order) => {
  return client.post(updateEndpoint, order);
};

export default {
  addOrders,
  getOrder,
  deleteListings,
  updateOrders,
};
