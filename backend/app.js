require("dotenv").config();

const exitHook = require("exit-hook");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");

//DB Connection
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

//My Routes
app.use("/api", authRoutes); // signin, signout, signup

// EXIT HOOK
exitHook(() => {
  console.log("Exiting");
});

//PORT
const port = process.env.PORT || 3000;

//Starting a server
app.listen(port, () => {
  process.on(
    "exit",
    exitHook(() => {
      console.log("Exiting");
    })
  );
  console.log(`app is running at ${port}`);
});
