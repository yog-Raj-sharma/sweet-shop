const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const sweetController = require("../controllers/sweet.controller");

router.post("/", auth, sweetController.addSweet);
router.get("/", auth, sweetController.getSweets);
router.get("/search", auth, sweetController.searchSweets);
router.put("/:id", auth, sweetController.updateSweet);
router.delete("/:id", auth, role("admin"), sweetController.deleteSweet);

router.post("/:id/purchase", auth, sweetController.purchaseSweet);
router.post("/:id/restock", auth, role("admin"), sweetController.restockSweet);

module.exports = router;
