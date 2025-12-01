const { Router } = require("express");

const userRoutes = require("./users.routes");
const orderRoutes = require("./orders.routes");

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/orders", orderRoutes);

module.exports = routes;