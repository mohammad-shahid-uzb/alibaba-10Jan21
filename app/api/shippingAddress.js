import client from "./client";
const endpoint = "/profiles/customer/delete";
const endpointCreate = "/profiles/customer/create";
const endpointGet = "/profiles/customer/getByUserId";
const endpointUpdate = "/profiles/customer/update";
const endpointShippingAddressGet = "/profiles/shippingAddress/getByUserId";
const endpointShippingAddressAdd = "/profiles/shippingAddress/add";
const endpointShippingAddressUpdate = "/profiles/shippingAddress/update";

const getListings = (userId) => client.post(endpointGet, userId);
const getShippingAddress = (userId) =>
  client.post(endpointShippingAddressGet, userId);
const deleteListing = (id) => client.post(endpoint + "/" + id);

export const addListing = async (listing, onUploadProgress) => {
  return client.post(endpointCreate, listing, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export const addShippingaddress = async (listing, onUploadProgress) => {
  return client.post(endpointShippingAddressAdd, listing, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export const updateListing = async (updateData, onUploadProgress) => {
  return client.post(
    endpointUpdate,
    { updateData },
    {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    }
  );
};
export const updateShippingAddress = async (updateData, onUploadProgress) => {
  return client.post(
    endpointShippingAddressUpdate,
    { updateData },
    {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    }
  );
};

export default {
  addListing,
  getListings,
  deleteListing,
  updateListing,
  addShippingaddress,
  getShippingAddress,
  updateShippingAddress,
};
