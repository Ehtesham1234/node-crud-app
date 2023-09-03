const Item = require("../models/itemModel");
const { validationResult } = require("express-validator");

// Controller for handling CRUD operations on items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
};

exports.updateItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
};
