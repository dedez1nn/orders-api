const UserService = require("../services/UserService");

class UserController {
  constructor() {
    this.service = new UserService();
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
}

module.exports = UserController;
