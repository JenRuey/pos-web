import Axios from "axios";

const OrderServices = {
  testFlightOrder: async function () {
    let response = await Axios({
      url: "http://localhost:8000/orders",
      method: "GET"
    });
    return response;
  },

  getProduct: async function () {
    let response = await Axios({
      url: "http://localhost:8000/products",
      method: "GET"
    });
    return response;
  }
};

export default OrderServices;