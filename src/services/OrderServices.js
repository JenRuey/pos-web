import Axios from "axios";
import { baseURL } from "./Config";

const OrderServices = {
  testFlightOrder: async function () {
    let response = await Axios({
      url: baseURL + "/orders",
      method: "GET"
    });
    return response;
  },

  getProduct: async function () {
    let response = await Axios({
      url: baseURL + "/products",
      method: "GET"
    });
    return response;
  },

  createOrder: async function (data) {
    let response = await Axios({
      url: baseURL + "/store_order",
      method: "POST",
      data
    });
    return response;
  }
};

export default OrderServices;
