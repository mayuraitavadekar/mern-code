import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "../assets/css/forms.css";
import { signup } from "../auth/helper";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, lastname, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    signup({ name, lastname, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            error: "",
            success: true,
            name: "",
            lastname: "",
            email: "",
            password: "",
          });
        }
      })
      .catch(console.log("error in front-end signup!"));
  };

  const errorMessage = () => {
    return (
      <Alert variant="danger" style={{ display: error ? "" : "none" }}>
        Error in signing up. Please try again.
      </Alert>
    );
  };

  const successMessage = () => {
    return (
      <Alert variant="success" style={{ display: success ? "" : "none" }}>
        Successfully Signup. Please <Link to="/signin">Login Here.</Link>
      </Alert>
    );
  };

  const signupForm = () => {
    return (
      <Container className="form" fluid>
        <Row>
          <Col className="text-center">
            <h2 className="my-5">Welcome</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            {errorMessage()}
            {successMessage()}
          </Col>
        </Row>
        <Form>
          <Form.Group controlId="formBasicName">
            <Row>
              <Col>
                <Form.Label className="form-label">First Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange("name")}
                  value={name}
                  placeholder="Enter First Name"
                />
              </Col>
              <Col>
                <Form.Label className="form-label">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange("lastname")}
                  value={lastname}
                  placeholder="Enter Last Name"
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Form.Label className="form-label">Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={handleChange("email")}
              value={email}
              placeholder="abc@gmail.com"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange("password")}
              value={password}
              placeholder="Password"
            />
            <Form.Text className="text-muted text-center">
              We'll never share your private data with anyone else.
            </Form.Text>
          </Form.Group>
          <Row>
            <Col className="text-center">
              <Button onClick={onSubmit} variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  };

  //TODO: This is main component
  return <div>{signupForm()}</div>;
};

export default Signup;
