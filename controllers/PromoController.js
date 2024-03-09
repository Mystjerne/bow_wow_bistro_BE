const BaseController = require("./BaseController");

//Add a photo url link?
class PromoController extends BaseController {
  constructor(model, mealModel, ingredientModel) {
    super(model);
    this.mealModel = mealModel;
    this.ingredientModel = ingredientModel;
  }

  // Create MEAL
  async addPromo(req, res) {
    const { user_id, meal_name, meal_description, base_price, availability } =
      req.body;
    try {
      // Create new meal
      const newMeal = await this.model.create({
        user_id: user_id,
        meal_name: meal_name,
        meal_description: meal_description,
        base_price: base_price,
        availability: availability,
      });
      // Respond with new meal
      return res.json(newMeal);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Edit and Update meal
  async updatePromo(req, res) {
    const { user_id, meal_name, meal_description, base_price, availability } =
      req.body;
    const { mealId } = req.params;
    //if mealID /= in the list of meals, should throw error and not be able to update

    try {
      let meal_data = await this.model.findOne({
        where: { id: mealId },
      });
      if (meal_data == null) {
        throw new Error(
          "Meal you are trying to edit does not exist in the database."
        );
      }
      await this.model.update(
        {
          user_id: user_id,
          meal_name: meal_name,
          meal_description: meal_description,
          base_price: base_price,
          availability: availability,
        },
        {
          where: {
            id: mealId,
          },
        }
      );
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = PromoController;
