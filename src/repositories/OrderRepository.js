const knex = require("../db/connection");

class OrderRepository {
  async create({ order, items }) {
    const insertedOrder = await knex.transaction(async (trx) => {
      const [orderCreated] = await trx("orders").insert(order).returning("*");

      const itemsToInsert = items.map((item) => {
        return {
          orderId: orderCreated.orderId,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        };
      });

      await trx("items").insert(itemsToInsert);

      return orderCreated;
    });

    return insertedOrder;
  }

  async list() {
    return await knex("orders");
  }

  async getById(id) {
    const order = await knex("orders").where({ orderId: id }).first();
    if (!order) return null;

    const items = await knex("items").where({ orderId: id });
    return { ...order, items };
  }

  async update(id, data) {
    return await knex("orders").where({ orderId: id }).update(data).returning("*");
  }

  async delete(id) {
    return await knex("orders").where({ orderId: id }).del();
  }
}

module.exports = OrderRepository;
