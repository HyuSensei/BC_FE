import axios from "axios";
import { UrlApi } from "../url";

const URL_API = UrlApi();

const getProductCategory = async ({ category_id, page = 1, limit = 8 }) => {
  return await axios.get(
    URL_API + `/categories/${category_id}?page=${page}&limit=${limit}`
  );
};

const getProductSearch = async ({ name, page = 1, limit = 8 }) => {
  return await axios.get(
    URL_API + `/search?name=${name}&page=${page}&limit=${limit}`
  );
};

const getOrderAdmin = async ({ page = 1, limit = 5 }) => {
  return await axios.get(
    URL_API + `/admin/dashboard?page=${page}&limit=${limit}`,
    {
      withCredentials: true,
    }
  );
};

const getOrder = async ({ page = 1, limit = 5 }) => {
  return await axios.get(
    URL_API + `/admin/orders?page=${page}&limit=${limit}`,
    {
      withCredentials: true,
    }
  );
};

const getProductAdmin = async ({ page = 1, limit = 5 }) => {
  return await axios.get(
    URL_API + `/admin/products?page=${page}&limit=${limit}`,
    {
      withCredentials: true,
    }
  );
};

const fetchAllOrder = async (user_id) => {
  return await Promise.all([
    axios.get(URL_API + `/order_wait/${user_id}`, {
      withCredentials: true,
    }),
    axios.get(URL_API + `/order_ship/${user_id}`, {
      withCredentials: true,
    }),
    axios.get(URL_API + `/order_complete/${user_id}`, {
      withCredentials: true,
    }),
    axios.get(URL_API + `/order_cancel/${user_id}`, {
      withCredentials: true,
    }),
  ]);
};

const fetchAllProduct = async ({ page = 1, limit = 5 }) => {
  return await axios.get(
    URL_API + `/products/home?page=${page}&limit=${limit}`,
    {
      withCredentials: true,
    }
  );
};

export {
  getProductCategory,
  getProductSearch,
  getOrderAdmin,
  getOrder,
  getProductAdmin,
  fetchAllOrder,
  fetchAllProduct,
};
