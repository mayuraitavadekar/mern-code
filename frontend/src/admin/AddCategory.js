import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper/index";
import AdminDashBoard from "../user/AdminDashBoard";
import { Row, Col, Form, Button, Container, Alert } from "react-bootstrap";
import "../assets/css/forms.css";
import { addCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError(false);
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);

    // backend req
    addCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          return setError(true);
        } else {
          setError(false);
          setSuccess(true);
          setName("");
        }
      })
      .catch((err) => console.log("error in add category front end ", err));
  };

  const successMessage = () => {
    if (success) {
      return (
        <div>
          <Row>
            <Col className="text-center">
              <Alert variant="success">
                New category created successfully.
              </Alert>
            </Col>
          </Row>
        </div>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return (
        <div>
          <Row>
            <Col className="text-center">
              <Alert variant="danger">
                Error in creating new Category. Please try again.
              </Alert>
            </Col>
          </Row>
        </div>
      );
    }
  };

  //TODO: form comonent
  const addCategoryForm = () => {
    return (
      <div>
        <Container className="form" fluid>
          <Form>
            <Row>
              <Col className="text-center">
                <Form.Group>
                  <Form.Label>Create Category</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={handleChange}
                    placeholder="Enter Category"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Button variant="primary" onClick={onSubmit} type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  };

  //TODO: main add category component
  return (
    <div>
      <AdminDashBoard />
      {successMessage()}
      {errorMessage()}
      {addCategoryForm()}
    </div>
  );
};

export default AddCategory;
