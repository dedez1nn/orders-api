const db = require("../database/db");

module.exports = {
  async createItem(data) {
    const { orderId, productId, quantity, price } = data;

    await db("Items").insert({
      orderId,
      productId,
      quantity,
      price
    });

    return { message: "Item criado com sucesso" };
  },

  async getItemsByOrder(orderId) {
    return db("Items").where({ orderId });
  },
};
