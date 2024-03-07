const BaseController = require("./BaseController");

//Add a photo url link?
class MealController extends BaseController {
  constructor(model, mealModel, ingredientModel, mealIngredientsModel) {
    super(model);
    this.mealModel = mealModel;
    //is this.model equal to mealModel, or is this.mealModel equal to mealModel?
    this.ingredientModel = ingredientModel;
    this.mealIngredientsModel = mealIngredientsModel;
  }

  // Create MEAL
  async addMeal(req, res) {
    //Adding new basic new meal.
    const {
      user_id,
      meal_name,
      meal_photo,
      meal_description,
      base_price,
      availability,
      ingredients,
    } = req.body;
    try {
      // Create new meal
      const newMeal = await this.model.create({
        user_id: user_id,
        meal_name: meal_name,
        meal_photo: meal_photo,
        meal_description: meal_description,
        base_price: base_price,
        availability: availability,
      });
      //add entries to meal_ingredients.
      //ingredients contains an array of ingredientIDs. We don't know the length of it yet.
      try {
        for (let ingredientId in ingredients) {
          console.log("i am ingredient pk", ingredientId);
          console.log("ingredients", ingredients);
          console.log("ingredients is an array?", Array.isArray(ingredients));
          //ingredientID is returning as 0, even though the request is sending an array of ingredientIds 21 and 11.

          const ingredient = await this.model.findByPk(ingredientId);
          if (!ingredient) {
            return res.status(404).json({
              error: true,
              msg: "Cannot add the ingredient for this meal. There is no ingredient with the provided ID.",
            });
          }
        }
        const addMealIngredient = await this.mealIngredientsModel.findAll({
          where: {
            id: ingredients,
          },
        });

        await addMealIngredient.setMealIngredient(addMealIngredient);

        return res.json(addMealIngredient, newMeal);
      } catch (err) {
        return res.status(400).json({ error: true, msg: err });
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Edit and Update meal
  async updateMeal(req, res) {
    const {
      user_id,
      meal_name,
      meal_photo,
      meal_description,
      base_price,
      availability,
    } = req.body;
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
          meal_photo: meal_photo,
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

module.exports = MealController;
