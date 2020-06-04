import React from "react";
import Menu from "./Menu";
import { Container } from "react-bootstrap";
import "../assets/css/base.css";

const Base = ({ children }) => {
  return (
    <div>
      <Container className="bg-dark header p-2" fluid>
        <p className="font-weight-bold text-white ml-2 mt-1">
          Call us +918975399519
        </p>
      </Container>
      <Menu />
      <div className="base">
        <div className="text-center children">{children}</div>
        <footer className="footer fixed-bottom">
          <p className="text-center text-white bg-info">
            Copyright © 2020 Educulture. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Base;
