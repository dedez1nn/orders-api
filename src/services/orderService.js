const db = require("../database/db");

module.exports = {
  async createOrder(data) {
    const { numero, valor, dataCriacao } = data;

    await db("Order").insert({
      numero,
      valor,
      dataCriacao,
    });

    return { message: "Pedido criado com sucesso" };
  },

  async getOrders() {
    return db("Order").select("*");
  },

  async getOrderByNumber(numero) {
    return db("Order").where({ numero }).first();
  },

  async deleteOrder(numero) {
    return db("Order").where({ numero }).del();
  }
};
