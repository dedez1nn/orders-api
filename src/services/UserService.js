const UserRepository = require("../repositories/UserRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserService {
  constructor() {
    this.repo = new UserRepository();
  }

  async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 8);
    return await this.repo.create({ ...data, password: hashedPassword });
  }

  async login(email, password) {
    const user = await this.repo.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "default_secret", {
      expiresIn: "1d",
    });

    return { user, token };
  }

  async list() {
    return await this.repo.list();
  }
}

module.exports = UserService;
