import { API } from "../../backend";

// category calls
export const addCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("error in hitting add category route ", err));
};

// get all categories
export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) =>
      console.log("error in hitting get all categories route ", err)
    );
};

// course calls

// create
export const createCourse = (userId, token, course) => {
  return fetch(`${API}/course/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: course,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("error in hitting create course route"));
};

// read
export const getAllCourses = () => {
  return fetch(`${API}/courses`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("error in hitting getAllCourses route ", err));
};

export const getCourse = (courseId) => {
  return fetch(`${API}/course/${courseId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("error in hitting getCourse route ", err));
};

// update
export const updateCourse = (userId, token, course, courseId) => {
  return fetch(`${API}/course/${courseId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: course,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("error in hitting updateCourse route ", err));
};

// delete product
export const deleteCourse = (userId, courseId, token) => {
  return fetch(`${API}/course/${courseId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("error in hitting delete course route ", err));
};

export const getCourseDataFromCloud = (courseurl, token) => {
  return fetch(`${API}/coursedata`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: courseurl,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) =>
      console.log("error in hitting get getCourseData route", err)
    );
};
