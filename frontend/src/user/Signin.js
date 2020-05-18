import React, { useState } from "react";
import { Alert, Form, Row, Col, Button, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    didRedirect: false,
  });

  const { email, password, error, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, didRedirect: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              email: "",
              password: "",
              error: "",
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("error in frontend signin."));
  };

  const errorMessage = () => {
    return (
      <Alert variant="danger" style={{ display: error ? "" : "none" }}>
        Error in Signing In. Please try again.
      </Alert>
    );
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/" />; // currently!
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const signinForm = () => {
    return (
      <Container className="form" fluid>
        <Row>
          <Col className="text-center">
            <h2 className="my-5">Welcome Back!</h2>
          </Col>
        </Row>
        <Row>{errorMessage() && <Col>{errorMessage()}</Col>}</Row>
        <Form>
          <Form.Group>
            <Form.Label className="form-label">Email address</Form.Label>
            <Form.Control
              onChange={handleChange("email")}
              value={email}
              type="email"
              placeholder="abc@gmail.com"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              onChange={handleChange("password")}
              value={password}
              type="password"
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

  //TODO: main signin component
  return (
    <div>
      {signinForm()}
      {performRedirect()}
    </div>
  );
};

export default Signin;
