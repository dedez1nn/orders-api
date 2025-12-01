const OrderService = require("../services/OrderService");

class OrderController {
  constructor() {
    this.service = new OrderService();
  }

  create = async (req, res, next) => {
    try {
      const result = await this.service.create(req.body);
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  list = async (req, res, next) => {
    try {
      const result = await this.service.list();
      return res.json(result);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await this.service.getById(id);
      return res.json(result);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await this.service.update(id, req.body);
      return res.json(result);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = OrderController;
