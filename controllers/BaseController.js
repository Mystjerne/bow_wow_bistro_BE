class BaseController {
  constructor(model) {
    this.model = model;
  }

  async getAll(req, res) {
    try {
      console.log("getall in basecontroller is being called.");
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = BaseController;
