import { API } from "../../backend";

export const createOrder = (user, token, orderData) => {
  return fetch(`${API}/order/create/${user._id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  })
    .catch((response) => {
      return response.json();
    })
    .catch((err) => console.log("error in hitting createOrder route."));
};

export const pushOrderInUserPurchaseList = (
  user,
  token,
  courseId,
  purchaseData
) => {
  return fetch(`${API}/order/push/${courseId}/${user._id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(purchaseData),
  })
    .catch((response) => {
      return response.json();
    })
    .catch((err) =>
      console.log("error in hitting pushOrderInUserPurchaseList route.")
    );
};

export const getUserPurchaseList = (user, token) => {
  return fetch(`${API}/user/courses/${user._id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("error in hitting getUserCourses route.", err));
};
