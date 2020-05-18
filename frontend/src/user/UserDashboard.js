import React from "react";
import "../assets/css/styles.css";
import "../assets/css/userdashboard.css";
import Base from "../core/Base";
import { Container, Col, Form, Row, Button } from "react-bootstrap";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const userInformation = () => {
    return (
      <Container className="user-dashboard my-5">
        <Row>
          <h2 className="m-4">Personal Information</h2>
        </Row>
        <hr />
        <Row>
          <Col>
            <p className="m-2 font-weight-bold">NAME</p>
            <p className="m-2 lead">
              {isAuthenticated().user.name}
              <span> </span> {isAuthenticated().user.lastname}
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <p className="m-2 font-weight-bold">EMAIL</p>
            <p className="m-2 lead">{isAuthenticated().user.email}</p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <p className="m-2 font-weight-bold">CONTACT NUMBER</p>
            <p className="m-2 lead">+918975399519</p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <p className="m-2 font-weight-bold">YOUR DATA</p>
            <p className="m-2 lead ">
              Your information is safe with us. Check our{" "}
              <Link to="">Privacy Policy</Link>.
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <h2 className="m-4">Change Password</h2>
        </Row>
        <hr />
        <Container className="change-password-container text-center" fluid>
          <Form>
            <Form.Group>
              <Row>
                <Col xs={4}>
                  <Form.Label className="m-2 font-weight-bold">
                    New Password
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control type="password" />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col xs={4}>
                  <Form.Label className="m-2 font-weight-bold">
                    Confirm Password
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control type="password" />
                </Col>
              </Row>
            </Form.Group>
            <Row>
              <Col xs={4}></Col>
              <Col xs={6} className="justify-content-left">
                <Button
                  className="change-password-button"
                  variant="primary"
                  type="submit"
                >
                  Change Password
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
        <hr />
        <Row>
          <h2 className="m-4">Delete Account</h2>
        </Row>
        <hr />
        <Row>
          <Col xs={4}>
            <p className="m-4">
              You can delete your account, but keep in mind that this action is
              irreversible.
            </p>
          </Col>
          <Col xs={6}>
            <Button className="mt-4" variant="danger">
              Delete My Account
            </Button>
          </Col>
        </Row>
      </Container>
    );
  };

  //TODO: the main user dashboard component
  return (
    <div>
      <Base
        title="Account"
        desciption="We encourage you not to share any personal data with anyone."
      />
      {userInformation()}
    </div>
  );
};

export default UserDashboard;
