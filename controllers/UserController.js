const BaseController = require("./BaseController");

//Add a photo url link?
class UserController extends BaseController {
  constructor(model) {
    super(model);
  }

  async addUser(req, res) {
    const { email, admin } = req.body;
    try {
      // Create new user
      const newUser = await this.model.create({
        email: email,
        admin: admin,
      });
      // Respond with new user
      return res.json(newUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async checkUserExists(req, res) {
    const { email } = req.body;
    try {
      //check if the email exists in the database
      const user = await this.model.findOne({ where: { email: email } });

      if (user) {
        return res.json(user);
      } else {
        return res.json("The user does not exist in the database.");
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = UserController;
