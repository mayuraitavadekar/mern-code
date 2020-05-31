import React, { useState, useEffect } from "react";
import Base from "./Base";
import "../assets/css/coursecomponent.css";
import { Accordion, Card, Button, Col, Row, Container } from "react-bootstrap";
import { getCourseByName } from "./helper/coreapicalls";
import Imagehelper from "./helper/Imagehelper";

const CourseComponent = ({ match }) => {
  const [values, setValues] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    coursedata: [],
    error: false,
    loading: false,
    success: false,
  });

  const { name, description, price, category, coursedata } = values;

  const preload = (courseName) => {
    courseName = courseName.replace(/%20/g, " ");
    getCourseByName({ courseName })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            _id: data._id,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category.name,
            coursedata: data.coursedata,
            success: true,
            error: false,
            loading: false,
          });
        }
      })
      .catch((err) => console.log("error in getCourseByName in the frontend"));
  };

  useEffect(() => {
    preload(match.params.courseName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // setValues will only run if the value of success got changed! else 'values' will not be updated!

  //TODO: main coursedata component
  return (
    <div>
      <Base />
      <Container className="mt-4">
        <Row>
          <Col className="left-pane" xs={12} sm={12} md={8} lg={8}>
            <Row>
              <Col>
                <h3>{name}</h3>
              </Col>
            </Row>
            <Row className="pt-2 pb-2">
              <Col>
                <p>{description}</p>
              </Col>
            </Row>
            <Row className="pt-4 pb-2">
              <Col>
                <h3>Syllabus</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                {coursedata.map((item, index1) => {
                  return (
                    <Accordion key={index1} defaultActiveKey="0">
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                          <Row>
                            <Col>{index1 + 1}</Col>
                            <Col className="text-center">
                              {item.sectionname}
                            </Col>
                            <Col className="text-right">
                              {item.sectiondata.length} Lessons
                            </Col>
                          </Row>
                        </Accordion.Toggle>
                        {item.sectiondata.map((sectiondata, index2) => (
                          <Accordion.Collapse eventKey="0">
                            <Card.Body as={Button} variant="link">
                              {sectiondata.topic}
                            </Card.Body>
                          </Accordion.Collapse>
                        ))}
                      </Card>
                    </Accordion>
                  );
                })}
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4}>
            <Row>
              <Card className="m-auto right-pane" style={{ width: "18rem" }}>
                <Imagehelper course={values} />
                <Card.Body>
                  <Card.Title>What's Included</Card.Title>
                  <Card.Text>Accessible Anytime Online</Card.Text>
                  <Card.Text>120 days validity</Card.Text>
                  <Card.Text>Rs. {price} /-</Card.Text>
                  <Button variant="primary">purchase course</Button>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CourseComponent;

/* comments - 

1. haven't kept the container = fluid because I need some margin from left and right

*/
