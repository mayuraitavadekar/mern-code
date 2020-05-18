import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Col } from "react-bootstrap";

const currentTab = (history, path) => {
  if (history.location.pathname === path) return true;
  else return false;
};

const AdminNavbar = ({ history }) => {
  return (
    <div>
      <Nav fill variant="tabs">
        <Col>
          <Nav.Item>
            <Nav.Link
              as={Link}
              active={currentTab(history, "/admin/create/category")}
              to="/admin/create/category"
            >
              Add Category
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link
              as={Link}
              active={currentTab(history, "/admin/categories")}
              to="/admin/categories"
            >
              Manage Categories
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link
              as={Link}
              active={currentTab(history, "/admin/courses")}
              to="/admin/courses"
            >
              Manage Courses
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link
              as={Link}
              active={currentTab(history, "/admin/create/course")}
              to="/admin/create/course"
            >
              Create Course
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link
              as={Link}
              active={currentTab(history, "/admin/orders")}
              to="/admin/orders"
            >
              Manage Orders
            </Nav.Link>
          </Nav.Item>
        </Col>
      </Nav>
    </div>
  );
};

export default withRouter(AdminNavbar);
