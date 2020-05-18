const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB. Please try again.",
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  let category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Error in creating category. Please try again.",
      });
    }
    return res.json(category);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "error in getting all categories",
      });
    }
    return res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  let category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "error in updating category",
      });
    }
    return res.json(updatedCategory);
  });
};

exports.deleteCategory = (req, res) => {
  let category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "error in deleting category",
      });
    }
    return res.json({
      message: "category deleted successfully.",
    });
  });
};
