const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const passport = require("passport");

const student = require("./src/routes/student");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use(require("morgan")("dev"));

//DB Config
const db = require("./src/config/keys").mongoURI;

//Connect to Mongodb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
// app.use(passport.initialize());

// Passport Config
// require("./src/config/passport")(passport);

app.use("/student", student);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));
