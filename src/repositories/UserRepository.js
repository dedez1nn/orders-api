const knex = require("../db/connection");

class UserRepository {
  async create(data) {
    const inserted = await knex("users").insert(data).returning("*");
    return inserted[0];
  }

  async list() {
    return await knex("users");
  }

  async findByEmail(email) {
    return await knex("users").where({ email }).first();
  }
}

module.exports = UserRepository;
