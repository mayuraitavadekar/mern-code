import { API } from "../../backend";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("error in fetch-signup : ", err));
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("error in fetch-signin : ", err));
};

export const signout = (next) => {
  // remove cookie
  console.log("signout work!");
  cookies.remove("user_data");
  next();

  // hitting route
  return fetch(`${API}/signout`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("error in fetch-signout : ", err));
};

export const authenticate = (data, next) => {
  cookies.set("user_data", data, {
    path: "/",
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 1),
  });
  console.log("user has been authenticated : ", cookies.get("user_data"));
  next();
};

export const isAuthenticated = () => {
  if (cookies.get("user_data")) {
    // user data is present
    //TODO: before returning cookie check whether it needs to parse json or not
    return cookies.get("user_data");
  } else {
    return false;
  }
};
