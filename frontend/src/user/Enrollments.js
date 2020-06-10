import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import "../assets/css/enrollment.css";
import { Container, Row, Col, Image, Badge, Spinner } from "react-bootstrap";
import { isAuthenticated } from "../auth/helper/index";
import { getUserPurchaseList } from "./helper/userapicalls";
import { Link } from "react-router-dom";
import { API } from "../backend";

const Enrollments = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    courses: [],
    loading: false,
  });

  const { courses, loading } = values;

  const preload = () => {
    setValues({ ...values, loading: true });
    getUserPurchaseList(user, token).then((data) => {
      if (data) {
        let courses = [];
        data.map((item, index) => courses.push(item));
        setValues({ ...values, courses: courses, loading: false });
      } else {
        setValues({ ...values, error: true, loading: false });
      }
    });
  };

  useEffect(() => {
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const coursesFetched = () => {
    return (
      <div>
        <Base />
        <Container className="mt-2" fluid>
          <h2 className="text-center">Your Courses</h2>
          {courses.map((item, index) => {
            return (
              <div key={index}>
                <hr />
                <Row
                  as={Link}
                  style={{ textDecoration: "none" }}
                  className="mt-4"
                  to="/videoplayer"
                >
                  <Col className="text-center" xs={6} md={4}>
                    <Image
                      src={`${API}/course/photo/${item.course}`}
                      thumbnail
                    />
                  </Col>
                  <Col xs={6} md={4}>
                    <div className="ml-2">
                      <p>{item.category}</p>
                      <p className="font-weight-bold mt-2">{item.name}</p>
                      <Badge variant="secondary mt-3">purchased</Badge>
                      <p className="mt-2">
                        Expires on:
                        <span className="font-weight-bold">
                          {" "}
                          {new Date(item.expiration_date).getDate() +
                            "/" +
                            new Date(item.expiration_date).getMonth() +
                            "/" +
                            new Date(item.expiration_date).getFullYear()}
                        </span>
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })}
        </Container>
      </div>
    );
  };

  return (
    <div>
      {!loading ? (
        coursesFetched()
      ) : (
        <div className="text-center spinner">
          <Spinner animation="border" variant="primary" />
          <p>Loading.. Please Wait.</p>
        </div>
      )}
    </div>
  );
};

export default Enrollments;
