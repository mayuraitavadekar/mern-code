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

export const getCourseByName = (courseName) => {
  return fetch(`${API}/course`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courseName),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("error in hitting getCourseByName by route"));
};
