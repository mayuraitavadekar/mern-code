import { API } from "../../backend";

export const getCourses = () => {
  return fetch(`${API}/courses`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("error in hitting getCourses route"));
};
