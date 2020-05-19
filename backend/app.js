require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");
const orderRoutes = require("./routes/order");
const categoryRoutes = require("./routes/category");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(compression());

//My Routes
app.use("/api", authRoutes); // signin, signout, signup, middlewares - isSignin, isAuthenticated, isAdmin
app.use("/api", userRoutes); // getUserById, getUser, updateUser, deleteUser, getUserCourses, deleteAccount
app.use("/api", courseRoutes); // getUserById, getCourseById, createCourse, getCourse, getPhoto, deleteCourse, getAllCourses
app.use("/api", orderRoutes); // createOrder and getAllorders
app.use("/api", categoryRoutes);

//PORT
const port = process.env.PORT || 3000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
