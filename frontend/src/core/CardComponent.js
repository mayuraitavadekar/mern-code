import React from "react";
import { Card } from "react-bootstrap";
import Imagehelper from "./helper/Imagehelper";
import { Link } from "react-router-dom";

const CardComponent = ({ course }) => {
  const name = course ? course.name : "loading..";
  const lessons = course ? course.coursedata.length : "loading..";
  const price = course ? course.price : "loading..";

  return (
    <div>
      <Card
        as={Link}
        to={`/courses/${course.name}`}
        className="m-auto"
        style={{
          width: "18rem",
          textDecoration: "none",
        }}
      >
        <Imagehelper course={course} />
        <Card.Body className="text-left text-dark">
          <Card.Title>{name}</Card.Title>
          <Card.Text>{lessons}</Card.Text>
          <Card.Text>Rs. {price ? price + " /-" : "FREE"}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardComponent;
