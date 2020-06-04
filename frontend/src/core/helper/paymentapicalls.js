import { API } from "../../backend";

export const createPaymentOrder = (userId, token, orderdata) => {
  return fetch(`${API}/payment/create/order/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderdata),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("error in hitting createOrder route."));
};

export const verifyPayment = (userId, token, paymentdata) => {
  return fetch(`${API}/payment/verify/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentdata),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("error in hitting verifyPayment route."));
};
