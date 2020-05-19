import React from "react";
import { Card } from "react-bootstrap";
import { API } from "../../backend";

const Imagehelper = ({ course }) => {
  const imageurl = course
    ? `${API}/course/photo/${course._id}`
    : `https://picsum.photos/100/100`;

  return (
    <div>
      <Card.Img height="200px" variant="top" src={imageurl} />
    </div>
  );
};

export default Imagehelper;
