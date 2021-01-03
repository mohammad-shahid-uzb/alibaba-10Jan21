import client from "./client";

const endpoint = "/listings";

const getListings = (subcategoryId) => client.get(endpoint, { subcategoryId });
const deleteListings = (id) => client.delete(endpoint + "/" + id);

export const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("qty", listing.qty);
  data.append("unit", listing.unit);
  data.append("categoryId", listing.category.value);
  data.append("categoryName", listing.category.label);
  data.append("subcategoryId", listing.subcategory._id);
  data.append("subcategoryName", listing.subcategory.label);
  data.append("description", listing.description);

  listing.images.forEach((image, index) =>
    data.append("hospitalImage", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  // if (listing.location)
  //   data.append("location", JSON.stringify(listing.location));

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addListing,
  getListings,
  deleteListings,
};
