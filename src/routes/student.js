const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
var async = require("async");

// Load Validation
const validateStudentInput = require("../validation/student");

//Load Models
const Student = require("../models/student");

// @route   GET student/test
// @desc    Test post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "student Works" }));

// @route   GET student/all
// @desc    Get all student
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
  Student.find()
    .then(student => {
      if (!student) {
        errors.nostudent = "There are no students";
        res.status(404).json(errors);
      }
      res.json(student);
    })
    .catch(err => res.status(404).json({ student: "There are no students" }));
});

// @route   GET student/filtred
// @desc    Get all student filtred by name
// @access  Public
router.get("/filtred", (req, res) => {
  const errors = {};
  Student.find()
    .then(student => {
      if (!student) {
        errors.nostudent = "There are no students";
        res.status(404).json(errors);
      }
      async.forEach(
        student,
        function(user, SaveUserDone) {
          user.save(SaveUserDone);
        },
        function(saveErr) {
          if (saveErr) {
            console.log(saveErr);
            process.exit(1);
          }
          Student.find({}, null, { sort: { username: 1 } }, function(
            err,
            users
          ) {
            if (err) {
              console.log(err);
              process.exit(1);
            }
            console.log(users);
            process.exit(0);
          })
            .then(filtred => res.json(filtred))
            .catch(err => console.log(err));
        }
      );
    })
    .catch(err => res.status(404).json({ student: "There are no students" }));
});

// @route   GET student/:id
// @desc    Get student by id
// @access  Public
router.get("/:id", (req, res) => {
  Student.findOne({ _id: req.params.id })
    .then(student => {
      res.json(student);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST student/create
// @desc    Create new student
// @access  Public
router.post("/create", upload.single("photo"), (req, res) => {
  const { errors, isValid } = validateStudentInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  console.log(req.file, "file");
  // GEt fields
  const studentFields = {};
  if (req.body.name) studentFields.name = req.body.name;
  if (req.body.email) studentFields.email = req.body.email;
  if (req.body.order) studentFields.order = req.body.order;
  if (req.file) studentFields.photo = req.file.path;

  new Student(studentFields)
    .save()
    .then(student => res.json(student))
    .catch(err => console.log(err));
});

// @route   Put student/update/:id
// @desc    Update student
// @access  Public
router.put("/update/:id", upload.single("photo"), (req, res) => {
  const { errors, isValid } = validateStudentInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // GEt fields
  const studentFields = {};
  if (req.body.name) studentFields.name = req.body.name;
  if (req.body.email) studentFields.email = req.body.email;
  if (req.body.order) studentFields.order = req.body.order;
  if (req.file) studentFields.photo = req.file.path;

  Student.findOneAndUpdate(
    { _id: req.params.id },
    { $set: studentFields },
    { new: true }
  )
    .then(student => res.json(student))
    .catch(err => res.status(404).json({ Update: failed }));
});

// @route   Put student/ispresent/:id
// @desc    Update student isPresent to true
// @access  Public
router.put(
  "/ispresent/:id",

  (req, res) => {
    Student.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isPresent: true } },
      { new: true }
    )
      .then(student => res.json(student))
      .catch(err => res.status(404).json({ Update: failed }));
  }
);

// @route   DELETE student/id
// @desc    Delete student
// @access  Public
router.delete("/:id", (req, res) => {
  Student.findOneAndRemove({ _id: req.params.id }).then(
    res.json({ Success: true })
  );
});

module.exports = router;
