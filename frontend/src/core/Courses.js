import React, { useState, useEffect } from "react";
import Base from "./Base";
import CardComponent from "./CardComponent";
import { getCourses } from "./helper/coreapicalls";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(false);

  const loadCourses = () => {
    getCourses().then((data) => {
      if (data.error) {
        console.log("error in fetching courses");
        setError(true);
      } else {
        console.log("courses fetched ", data);
        setCourses(data);
      }
    });
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div>
      <Base title="Courses" description="browse courses here.">
        <Container className="my-3">
          <Row>
            {courses.map((course, index) => {
              return (
                <Col key={index} xs={4} md={4} sm={12}>
                  <CardComponent course={course} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </Base>
    </div>
  );
};

export default Courses;
