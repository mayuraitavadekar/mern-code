require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
const AWS = require("aws-sdk");

// AWS config
const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// setting up S3
const S3 = new AWS.S3({
  apiVersion: "2006-03-01",
  region: AWS.config.region,
});

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

/*
S3.listBuckets((err, data) => {
  if (err) console.log(err);
  else console.log("success", data);
});


const params = {
  Bucket: "ecma-course",
};

S3.listObjects(params, (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});

console.log("generating presigned URLs");

var presignedGETURL = S3.getSignedUrl("getObject", {
  Bucket: "ecma-course",
  Key: "ecma-11.mp4", //filename
  Expires: 100, //time to expire in seconds
});

console.log("presigned URLs ", presignedGETURL);
*/
