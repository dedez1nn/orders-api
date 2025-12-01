const UserRepository = require("../repositories/UserRepository");

class UserService {
  constructor() {
    this.repo = new UserRepository();
  }

  async create(data) {
    return await this.repo.create(data);
  }

  async list() {
    return await this.repo.list();
  }
}

module.exports = UserService;
