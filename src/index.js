const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/OrderController");

router.post("/orders", OrderController.create);
router.get("/orders", OrderController.list);
router.get("/orders/:orderId", OrderController.getById);

module.exports = router;
