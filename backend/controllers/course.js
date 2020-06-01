const Course = require("../models/course");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

// param
exports.getCourseById = (req, res, next, id) => {
  Course.findById(id).exec((err, course) => {
    if (err) {
      return res.status(404).json({
        error: "cannot find this course in db",
      });
    }
    req.course = course;
    next();
  });
};

//-----------------------------------------------------------------
//TODO: come here after creating admin panel for product creation! this is vulnerable!
exports.createCourse = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem in uploading image",
      });
    }

    // destructuring of fields
    const { name, description, courseurl, price } = fields;

    let array = [];
    let data = fields.coursedata;
    data = JSON.parse(data);
    data.map((item, index) => {
      array.push(item);
    });
    fields.coursedata = array;

    if (
      name == "" ||
      description == "" ||
      courseurl == "" ||
      price == "" ||
      fields.coursedata == ""
    ) {
      return res.status(400).json({
        error: "please include all the fields",
      });
    }

    let course = new Course(fields);

    // this include photo in course object
    if (file.photo) {
      course.photo.data = fs.readFileSync(file.photo.path);
      course.photo.contentType = file.photo.type;
    }

    course.save((err, course) => {
      if (err) {
        return res.status(400).json({
          error: "cannot save product in DB",
        });
      }
      return res.json(course);
    });
  });
};

exports.getCourse = (req, res) => {
  req.course.photo = undefined;
  return res.json(req.course);
};

exports.getPhoto = (req, res, next) => {
  if (req.course.photo.data) {
    res.set("Content-Type", req.course.photo.contentType);
    return res.send(req.course.photo.data);
  }
  next();
};

exports.updateCourse = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image. Please try again.",
      });
    }

    let array = [];
    let data = fields.coursedata;
    data = JSON.parse(data);
    data.map((item, index) => {
      array.push(item);
    });
    fields.coursedata = array;

    // updation code
    let course = req.course;
    course = _.extend(course, fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too big. Please try again.",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save product in DB

    course.save((err, course) => {
      if (err) {
        return res.status(400).json({
          error: "Error in updating course information",
        });
      }

      return res.json(course);
    });
  });
};

exports.deleteCourse = (req, res) => {
  let course = req.course;
  course.remove((err, deletedCourse) => {
    if (err) {
      return res.status(400).json({
        error: "cannot delete course!",
      });
    }
    return res.json({
      message: "course deleted!",
      deletedCourse,
    });
  });
};

exports.getAllCourses = (req, res) => {
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Course.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, courses) => {
      if (err) {
        res.status(400).json({
          error: "unable to view all courses",
        });
      }
      return res.json(courses);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Course.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "NO category found",
      });
    }
    return res.json(category);
  });
};

exports.getCourseByName = (req, res) => {
  let courseName = req.body.courseName;
  Course.findOne({ name: courseName })
    .populate("category")
    .select("-photo")
    .exec((err, course) => {
      if (err) {
        return res.status(400).json({
          error: "error in getting course data",
        });
      }
      return res.json(course);
    });
};
