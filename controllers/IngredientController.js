const BaseController = require("./BaseController");

//Add a photo url link?
class IngredientController extends BaseController {
  constructor(model) {
    super(model);
    //is this.model equal to ingredientModel?
    this.ingredientModel = model;
  }

  async addIngredient(req, res) {
    console.log("i am ingredient req.body", req.body);
    //req.body is console logging as "undefined"
    const { ingredientName, category, additionalPrice, availability, addOn } =
      req.body;
    try {
      // Create new meal
      const newIngredient = await this.ingredientModel.create({
        ingredientName: ingredientName,
        category: category,
        additionalPrice: additionalPrice,
        availability: availability,
        addOn: addOn,
      });
      // Respond with new meal
      return res.json(newIngredient);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async updateIngredient(req, res) {
    const { ingredientName, category, additionalPrice, availability, addOn } =
      req.body;
    const { ingredientId } = req.params;

    try {
      let ingredient_data = await this.ingredientModel.findOne({
        where: { id: ingredientId },
      });
      if (ingredient_data == null) {
        throw new Error(
          "Ingredient you are trying to edit does not exist in the database."
        );
      }
      await this.model.update(
        {
          ingredientName: ingredientName,
          category: category,
          additionalPrice: additionalPrice,
          availability: availability,
          addOn: addOn,
        },
        {
          where: {
            id: ingredientId,
          },
        }
      );
      const output = await this.ingredientModel.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async getAllMeat(req, res) {
    try {
      console.log("getall meat is being called.");
      const output = await this.model.findAll({ where: { category: "meat" } });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAllVegetable(req, res) {
    try {
      console.log("getall Vegetable is being called.");
      const output = await this.model.findAll({
        where: { category: "vegetable" },
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAllFruit(req, res) {
    try {
      console.log("getall Fruit is being called.");
      const output = await this.model.findAll({ where: { category: "fruit" } });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAllCarbs(req, res) {
    try {
      console.log("getall Carbs is being called.");
      const output = await this.model.findAll({ where: { category: "carbs" } });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = IngredientController;
