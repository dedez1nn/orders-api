const { Router } = require("express");
const OrderController = require("../controllers/OrderController");

const routes = Router();
const controller = new OrderController();

routes.post("/", controller.create);
routes.get("/list", controller.list);
routes.get("/:id", controller.getById);
routes.put("/:id", controller.update);
routes.delete("/:id", controller.delete);

module.exports = routes;

