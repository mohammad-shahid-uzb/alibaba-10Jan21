import { create } from "apisauce";
import cache from "../utility/cache";
import cardStorage from "../auth/cardstorage";

const apiClient = create({
  baseURL: "https://checkout.paycom.uz/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  request.headers["X-Auth"] = "5fc5ad4f967998274f7aefb9";
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }
  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default apiClient;
