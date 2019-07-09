const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  order: {
    type: Number
  },
  photo: {
    type: String
  },
  isPresent: {
    type: Boolean,
    default: false
  },
  date: {
    type: String,
    default: Date.now
  }
});

module.exports = student = mongoose.model("student", StudentSchema);
