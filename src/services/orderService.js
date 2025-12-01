const OrderRepository = require("../repositories/OrderRepository");

class OrderService {
  constructor() {
    this.repo = new OrderRepository();
  }

  async create(order) {
    return await this.repo.create(order);
  }

  async list() {
    return await this.repo.list();
  }
}

module.exports = OrderService;
