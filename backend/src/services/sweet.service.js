const Sweet = require("../models/Sweet");

const addSweet = (data) => Sweet.create(data);

const getAllSweets = () => Sweet.find();

const searchSweets = ({ name, category, minPrice, maxPrice }) => {
  const query = {};

  if (name) query.name = new RegExp(name, "i");
  if (category) query.category = category;

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = minPrice;
    if (maxPrice) query.price.$lte = maxPrice;
  }

  return Sweet.find(query);
};

const purchaseSweet = async (id) => {
  const sweet = await Sweet.findById(id);

  if (!sweet || sweet.quantity === 0) {
    throw new Error("Out of stock");
  }

  sweet.quantity -= 1;
  return sweet.save();
};

const restockSweet = async (id) => {
  const sweet = await Sweet.findById(id);
  sweet.quantity += 1;
  return sweet.save();
};

module.exports = {
  addSweet,
  getAllSweets,
  searchSweets,
  purchaseSweet,
  restockSweet
};
 