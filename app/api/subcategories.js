import client from "./client";

const endpoint = "/subcategories";

const getCategories = (categoryId) => client.get(endpoint, { categoryId });

export default {
  getCategories,
};
