import React, { useState, useEffect } from "react";
import AdminDashBoard from "../user/AdminDashBoard";
import {
  Form,
  Container,
  Row,
  Col,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import "../assets/css/forms.css";
import { isAuthenticated } from "../auth/helper/index";
import {
  getAllCategories,
  updateCourse,
  getCourse,
} from "./helper/adminapicall";

const UpdateCourse = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    courseurl: "",
    price: "",
    photo: "",
    category: "",
    coursedata: "",
    categories: [],
    loading: "",
    error: "",
    createdProduct: "",
    success: "",
    getRedirect: "",
    formData: "",
  });

  const {
    name,
    description,
    courseurl,
    price,
    categories,
    error,
    success,
    formData,
    loading,
    coursedata,
  } = values;

  const preload = (courseId) => {
    getCourse(courseId).then((data) => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(data);
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          coursedata: JSON.stringify(data.coursedata),
          courseurl: data.courseurl,
          formData: new FormData(),
        });
      }
    });
  };

  const preloadCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.courseId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true, success: false });
    updateCourse(user._id, token, formData, match.params.courseId)
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
          });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            courseurl: "",
            price: "",
            photo: "",
            loading: "",
            createdProduct: data.name,
            success: true,
            error: "",
          });
        }
      })
      .catch((err) => console.log("error in create course frontend"));
  };

  const successMessage = () => {
    if (success === true) {
      return (
        <div>
          <Row>
            <Col className="text-center">
              <Alert variant="success">Course updated successfully.</Alert>
            </Col>
          </Row>
        </div>
      );
    }
  };

  const errorMessage = () => {
    if (error === true) {
      return (
        <div>
          <Row>
            <Col className="text-center">
              <Alert variant="danger">
                Error in updating new Course. Please try again.
              </Alert>
            </Col>
          </Row>
        </div>
      );
    }
  };

  //TODO: main createForm Component
  const createCourseForm = () => {
    return (
      <Container className="form mt-2" fluid>
        <Form>
          <Form.Group controlId="formBasicName">
            <Row className="mt-2">
              <Col>
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={handleChange("name")}
                  placeholder="Enter Name"
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Form.Label className="form-label">Description</Form.Label>
                <Form.Control
                  value={description}
                  onChange={handleChange("description")}
                  placeholder="Enter Description"
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Form.Label className="form-label">Course URL</Form.Label>
                <Form.Control
                  value={courseurl}
                  onChange={handleChange("courseurl")}
                  placeholder="Paste URL here"
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Form.Label className="form-label">Price</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={handleChange("price")}
                  placeholder="INR"
                />
              </Col>
              <Col>
                <Form.Label className="form-label">Photo</Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  accept="image"
                  placeholder="choose a file"
                  onChange={handleChange("photo")}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" onChange={handleChange("category")}>
                  <option>select</option>
                  {categories &&
                    categories.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </Form.Control>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Course Data ( Enter JSON Data )</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    value={coursedata}
                    onChange={handleChange("coursedata")}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>

          <Row className="mt-2">
            <Col className="text-center">
              <Button
                variant="primary"
                onClick={onSubmit}
                disabled={loading}
                type="submit"
              >
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  };

  //TODO: main create-course component
  return (
    <div>
      <AdminDashBoard />
      {successMessage()}
      {errorMessage()}
      {createCourseForm()}
    </div>
  );
};

export default UpdateCourse;
