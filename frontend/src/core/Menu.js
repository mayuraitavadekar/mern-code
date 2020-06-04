import React, { Fragment } from "react";
import { Navbar, Nav, Button, DropdownButton, Dropdown } from "react-bootstrap";
import "../assets/css/menu.css";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper/index";

const Menu = ({ history }) => {
  return (
    <Navbar variant="light" className="color-nav responsive" expand="lg">
      <Navbar.Brand className="nav-brand" href="#home">
        Company Name
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto mr-3">
          <Nav.Link className="text-white m-auto" as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link className="text-white m-auto" as={Link} to="/courses">
            Courses
          </Nav.Link>
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <Nav.Link
              className="text-white m-auto"
              as={Link}
              to="/admin/dashboard"
            >
              Admin Dashboard
            </Nav.Link>
          )}
          {isAuthenticated() && (
            <Fragment>
              <Nav.Link as={Nav.Item}>
                <DropdownButton
                  key="down"
                  id="dropdown-button-drop-down"
                  drop="down"
                  variant="secondary"
                  title={isAuthenticated().user.email}
                >
                  <Dropdown.Item as={Link} to="/user/dashboard">
                    Account
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/user/courses">
                    Purchased Courses
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/user/support">
                    Support
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      signout(() => {
                        history.push("/");
                      });
                    }}
                  >
                    Sign Out
                  </Dropdown.Item>
                </DropdownButton>
              </Nav.Link>
            </Fragment>
          )}
          {!isAuthenticated() && (
            <Fragment>
              <Nav.Link as={Nav.Item}>
                <Button
                  as={Link}
                  className="m-auto"
                  variant="primary"
                  to="/signin"
                >
                  Sign In
                </Button>
              </Nav.Link>
              <Nav.Link as={Nav.Item}>
                <Button
                  as={Link}
                  className="m-auto"
                  variant="outline-light"
                  to="/signup"
                >
                  Sign up
                </Button>
              </Nav.Link>
            </Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Menu);

// used nav-link as={Nav.item} because of bootstrap margin problem
// the nav-link as default padding for navbar which is important to give structure
