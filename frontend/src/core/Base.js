import React from "react";
import Menu from "./Menu";
import { Jumbotron, Container } from "react-bootstrap";
import "../assets/css/base.css";

const Base = ({ title = "", description = "", children }) => {
  return (
    <div>
      <Menu />
      <div className="base">
        <Jumbotron className="base-jumbotron">
          <Container>
            <h2>{title}</h2>
            <p>{description}</p>
          </Container>
        </Jumbotron>
        <div className="text-center">{children}</div>
        <footer className="footer fixed-bottom">
          <p className="text-center text-white bg-dark">
            Copyright © 2020 Educulture. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Base;
