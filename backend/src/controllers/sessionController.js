const sessionService = require("../services/sessionService");

module.exports = {
  async create(req, res) {
    const {email, password} = req.body;

    try {
      const token = await sessionService.create(email.toLowerCase(), password);
      return res.json({ token });
    } catch (error) {
      return res.status(400).json({ message: error.message});
    }
  }
}