const Sweet = require("../models/Sweet");

exports.addSweet = async ({ name, category, price, quantity }) => {
  const existing = await Sweet.findOne({
    name: name.trim(),
    category: category.trim()
  });

  if (existing) {
    throw new Error("Sweet already exists");
  }

  return Sweet.create({ name, category, price, quantity });
};

exports.purchaseSweet = async (id) => {
  const sweet = await Sweet.findById(id);

  if (!sweet || sweet.quantity <= 0) {
    throw new Error("Out of stock");
  }

  sweet.quantity -= 1;
  await sweet.save();
  return sweet;
};
