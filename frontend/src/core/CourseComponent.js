import React, { useState, useEffect } from "react";
import Base from "./Base";
import "../assets/css/coursecomponent.css";
import {
  Accordion,
  Card,
  Button,
  Col,
  Row,
  Container,
  Spinner,
  Modal,
} from "react-bootstrap";
import { getCourseByName } from "./helper/coreapicalls";
import Imagehelper from "./helper/Imagehelper";
import { Link } from "react-router-dom";

const CourseComponent = ({ match }) => {
  const [values, setValues] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    courseurl: "",
    coursedata: [],
    error: false,
    loading: false,
    success: false,
  });

  const [modalShow, setModalShow] = useState(false);
  const [modalValues, setModalValues] = useState({
    videourl: "",
    topic: "",
  });

  const { name, description, price, coursedata } = values;

  const preload = (courseName) => {
    setValues({ ...values, loading: true });
    courseName = courseName.replace(/%20/g, " ");
    getCourseByName({ courseName })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({
            ...values,
            _id: data._id,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category.name,
            courseurl: data.courseurl,
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

  //TODO: my modal
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.modalValues.topic}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src={props.modalValues.videourl}
            width="100%"
            height="400px"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            title="ecma-22"
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" className="m-auto" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  //TODO: main component
  const component = () => {
    return (
      <div>
        <Base />
        <Container className="mt-4 mb-5">
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
                      <Accordion key={index1} defaultActiveKey="1">
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
                            <Accordion.Collapse key={index2} eventKey="0">
                              <Card.Body
                                as={Button}
                                variant="link"
                                onClick={() => {
                                  setModalShow(true);
                                  setModalValues({
                                    ...values,
                                    topic: sectiondata.topic,
                                    videourl: sectiondata.videourl,
                                  });
                                }}
                                // href={`/courses/${name}/${courseurl}`}
                              >
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
              <Container fluid>
                <Row>
                  <Col>
                    <Card
                      className="m-auto position-fixed"
                      style={{ width: "18rem" }}
                    >
                      <Imagehelper course={values} />
                      <Card.Body>
                        <Card.Title>What's Included</Card.Title>
                        <Card.Text className="mt-2">
                          Accessible Anytime Online
                        </Card.Text>
                        <Card.Text className="mt-2">
                          120 days validity
                        </Card.Text>
                        <Card.Text className="mt-2">Rs. {price} /-</Card.Text>
                        <Button
                          as={Link}
                          className="mt-2 "
                          variant="primary"
                          to=""
                        >
                          purchase course
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          modalValues={modalValues}
        />
      </div>
    );
  };

  //TODO: main coursedata component
  return (
    <div>
      {!values.loading ? (
        component()
      ) : (
        <div className="text-center spinner">
          <Spinner animation="border" variant="primary" />
          <p>Loading.. Please Wait.</p>
        </div>
      )}
    </div>
  );
};

export default CourseComponent;

/* comments - 

1. haven't kept the container = fluid because I need some margin from left and right

*/
