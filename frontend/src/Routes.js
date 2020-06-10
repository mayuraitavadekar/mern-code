import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashboard";
import AdminRoutes from "./auth/helper/AdminRoutes";
import AdminDashBoard from "./user/AdminDashBoard";
import CreateCourse from "./admin/CreateCourse";
import AddCategory from "./admin/AddCategory";
import ManageCourses from "./admin/ManageCourses";
import UpdateCourse from "./admin/UpdateCourse";
import Courses from "./core/Courses";
import CourseComponent from "./core/CourseComponent";
import Payment from "./user/Payment";
import Enrollments from "./user/Enrollments";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoutes path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoutes path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoutes
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoutes
          path="/admin/create/course"
          exact
          component={CreateCourse}
        />
        <AdminRoutes path="/admin/courses" exact component={ManageCourses} />
        <AdminRoutes
          path="/admin/course/update/:courseId"
          exact
          component={UpdateCourse}
        />
        <Route path="/courses" exact component={Courses} />
        <Route path="/courses/:courseName" exact component={CourseComponent} />
        <PrivateRoutes
          path="/course/payment/:courseName"
          exact
          component={Payment}
        />
        <PrivateRoutes path="/user/courses" exact component={Enrollments} />
      </Switch>
    </Router>
  );
};

export default Routes;
