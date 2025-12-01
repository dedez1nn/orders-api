const knex = require("../db/connection");

class OrderRepository {
  async create(data) {
    const inserted = await knex("Order").insert(data).returning("*");
    return inserted[0];
  }

  async list() {
    return await knex("Order");
  }
}

module.exports = OrderRepository;
