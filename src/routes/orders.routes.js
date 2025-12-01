const { Router } = require("express");
const OrderController = require("../controllers/OrderController");

const routes = Router();
const controller = new OrderController();

routes.post("/", controller.create);
routes.get("/", controller.list);

module.exports = routes;

