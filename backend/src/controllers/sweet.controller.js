const Sweet = require("../models/Sweet");
const sweetService = require("../services/sweet.service");

exports.addSweet = async (req, res) => {
  const { name, category } = req.body;

  const existingSweet = await Sweet.findOne({
    name: name.trim(),
    category: category.trim()
  });

  if (existingSweet) {
    return res.status(400).json({
      message: "Sweet already exists in this category"
    });
  }

  const sweet = await Sweet.create(req.body);
  res.status(201).json(sweet);
};


exports.getSweets = async (req, res) => {
  const sweets = await sweetService.getAllSweets();
  res.json(sweets);
};

exports.searchSweets = async (req, res) => {
  const sweets = await sweetService.searchSweets(req.query);
  res.json(sweets);
};

exports.updateSweet = async (req, res) => {
  const sweet = await Sweet.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(sweet);
};

exports.deleteSweet = async (req, res) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.json({ message: "Sweet deleted" });
};

exports.purchaseSweet = async (req, res) => {
  try {
    const sweet = await sweetService.purchaseSweet(req.params.id);
    res.json(sweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.restockSweet = async (req, res) => {
  const sweet = await sweetService.restockSweet(req.params.id);
  res.json(sweet);
};
