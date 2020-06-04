import React from "react";
import Base from "../core/Base";
import AdminNavbar from "./AdminNavbar";
import "../assets/css/styles.css";

const AdminDashBoard = ({ children }) => {
  return (
    <div>
      <Base>
        <AdminNavbar />
      </Base>
    </div>
  );
};

export default AdminDashBoard;
