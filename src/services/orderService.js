const OrderRepository = require("../repositories/OrderRepository");

class OrderService {
  constructor() {
    this.repo = new OrderRepository();
  }

  async create(data) {
    const { numeroPedido, valorTotal, dataCriacao, items } = data;

    const order = {
      orderId: numeroPedido,
      value: valorTotal,
      creationDate: dataCriacao,
    };

    const mappedItems = items.map((item) => ({
      productId: item.idItem,
      quantity: item.quantidadeItem,
      price: item.valorItem,
    }));

    return await this.repo.create({ order, items: mappedItems });
  }

  async list() {
    return await this.repo.list();
  }

  async getById(id) {
    return await this.repo.getById(id);
  }

  async update(id, data) {
    return await this.repo.update(id, data);
  }

  async delete(id) {
    return await this.repo.delete(id);
  }
}

module.exports = OrderService;
