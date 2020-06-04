require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
const vimeo = require("vimeo");
const Vimeo = require("vimeo").Vimeo;
const client = new Vimeo(
  process.env.V_CLIENT_ID,
  process.env.V_CLIENT_SECRET,
  process.env.V_ACCESS_TOKEN
);

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");
const orderRoutes = require("./routes/order");
const categoryRoutes = require("./routes/category");
const paymentRoutes = require("./routes/payment");
const cloudRoutes = require("./routes/cloud");

//Database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Vimeo Connection
client.request(
  {
    method: "GET",
    path: "/tutorial",
  },
  function (error, body, status_code, headers) {
    if (error) {
      console.log(error);
    }
    console.log(body);
    console.log("VIMEO CONNECTED");
  }
);

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
app.use("/api", paymentRoutes);
app.use("/api", cloudRoutes);

//PORT
const port = process.env.PORT || 3000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
