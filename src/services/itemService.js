const db = require("../database/db");

module.exports = {
  async createItem(data) {
    const { valor, quantidade, numero } = data;

    await db("Items").insert({
      valor,
      quantidade,
      numero
    });

    return { message: "Item criado com sucesso" };
  },

  async getItemsByOrder(numero) {
    return db("Items").where({ numero });
  },
};
