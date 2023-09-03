const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const itemController = require("../controllers/itemController");

// Validation middleware for item creation and update
const validateItem = [
  body("name").notEmpty().trim().escape(),
  body("description").notEmpty().trim().escape(),
];

// Define the routes
router.get("/items", itemController.getAllItems);
router.post("/items", validateItem, itemController.createItem);
router.put("/items/:id", validateItem, itemController.updateItem);
router.delete("/items/:id", itemController.deleteItem);

module.exports = router;
