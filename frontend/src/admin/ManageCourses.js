import React, { useEffect, useState } from "react";
import AdminDashBoard from "../user/AdminDashBoard";
import "../assets/css/forms.css";
import { getAllCourses, deleteCourse } from "./helper/adminapicall";
import { Container, Col, Row, Button } from "react-bootstrap";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllCourses()
      .then((data) => {
        if (data.error) {
          console.log("error in hitting getAllCourses() route ", data.error);
        } else {
          // console.log(data);
          setCourses(data);
        }
      })
      .catch((err) => console.log("error in getAllCourses at frontend ", err));
  };

  useEffect(() => {
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteSelectedCourse = (courseId) => {
    deleteCourse(user._id, courseId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  //TODO: main add category component
  return (
    <div>
      <AdminDashBoard />
      <div>
        {courses.map((item, index) => {
          return (
            <Container key={index} className="my-3 border">
              <Row>
                <Col className="border-right">
                  <p className="m-2 font-weight-bold">
                    COURSE NAME: {item.name}
                  </p>
                  <p className="m-2 font-weight-bold">
                    CATEGORY: {item.category.name}
                  </p>
                  <p className="m-2 font-weight-bold">
                    PRICE: {item.price === 0 ? "FREE" : item.price}
                  </p>
                </Col>
                <Col className="border-right">
                  <Row className="mt-4">
                    <Button
                      as={Link}
                      to={`/admin/course/update/${item._id}`}
                      className="m-auto"
                      variant="success"
                    >
                      Update
                    </Button>
                  </Row>
                </Col>
                <Col>
                  <Row className="mt-4">
                    <Button
                      onClick={() => {
                        deleteSelectedCourse(item._id);
                      }}
                      className="m-auto"
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Container>
          );
        })}
      </div>
    </div>
  );
};

export default ManageCourses;
