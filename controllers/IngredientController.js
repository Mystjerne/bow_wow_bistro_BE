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
    //if mealID /= in the list of meals, should throw error and not be able to update

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
}

module.exports = IngredientController;
