import client from "./client";
const endpointgetAll = "/profiles/shop/getAll";
const endpointget = "/profiles/shop/getByUserId";
const endpointgetshop = "/profiles/shop/getById";
const endpointupdate = "/profiles/shop/update";
const endpointcreate = "/profiles/shop/create";
const endpointdelete = "/profiles/shop";

const getAllShops = () => client.post(endpointgetAll);
const getListings = (userId) => client.post(endpointget, userId);
const getShopsById = (id) => client.post(endpointgetshop, id);

const deleteListings = (id) => client.delete(endpointdelete + "/" + id);

export const addListing = async (listing, onUploadProgress) => {
  return client.post(endpointcreate, listing, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export const updateListing = async (updateData, onUploadProgress) => {
  return client.post(
    endpointupdate,
    { updateData },
    {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    }
  );
};

export default {
  addListing,
  getAllShops,
  getShopsById,
  getListings,
  deleteListings,
  updateListing,
};
