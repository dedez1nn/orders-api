const { Router } = require("express");
const UserController = require("../controllers/UserController");

const routes = Router();
const controller = new UserController();

routes.post("/", controller.create);
routes.post("/login", controller.login);
routes.get("/", controller.list);

module.exports = routes;