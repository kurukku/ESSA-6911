const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateStudentInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.order = !isEmpty(data.order) ? data.order : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.order)) {
    errors.order = "Order field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
