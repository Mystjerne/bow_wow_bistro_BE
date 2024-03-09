const BaseController = require("./BaseController");

//Add a photo url link?
class MealController extends BaseController {
  constructor(model, ingredientModel, mealIngredientsModel) {
    super(model);
    this.ingredientModel = ingredientModel;
    this.mealIngredientsModel = mealIngredientsModel;
  }

  // Create MEAL
  async addMeal(req, res) {
    //Adding new basic new meal.
    const {
      userId,
      mealName,
      mealPhoto,
      mealDescription,
      basePrice,
      availability,
      ingredients,
    } = req.body;
    console.log(req.body, "i am meal name:", mealName);
    try {
      // Create new meal
      const newMeal = await this.model.create({
        userId: userId,
        mealName: mealName,
        mealPhoto: mealPhoto,
        mealDescription: mealDescription,
        basePrice: basePrice,
        availability: availability,
      });

      //after adding in a new meal, get the new meal id so we can can put it into meal_ingredients.

      //add entries to meal_ingredients.
      //ingredients contains an array of ingredientIDs. We don't know the length of it yet.
      try {
        for (let ingredientIndex in ingredients) {
          console.log(
            "ingredients[ingredientIndex],: ",
            ingredients[ingredientIndex]
          );

          var new_ingredient_pk = ingredients[ingredientIndex];

          var ingredient = await this.ingredientModel.findByPk(
            new_ingredient_pk
          );

          if (!ingredient) {
            console.log("Can't find the ingredient in the ingredient list.");
            return res.status(404).json({
              error: true,
              msg: "Cannot add the ingredient for this meal. There is no ingredient with the provided ID.",
            });
          }

          console.log("i am new ingredient id", new_ingredient_pk);
          console.log("i am newMeal.id: ", newMeal.id);
          const addMealIngredient = await this.mealIngredientsModel.create({
            mealId: newMeal.id,
            ingredientId: new_ingredient_pk,
            required: false,
            added: false,
          });
          console.log(addMealIngredient.toJSON());
        }

        return res.json(newMeal);
      } catch (err) {
        console.log("error with ingredient try block", err);
        return res.status(400).json({ error: true, msg: err });
      }
    } catch (err) {
      console.log("error with meal try block");
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Edit and Update meal
  async updateMeal(req, res) {
    const {
      userId,
      mealName,
      mealPhoto,
      mealDescription,
      basePrice,
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
          userId: userId,
          mealName: mealName,
          mealPhoto: mealPhoto,
          mealDescription: mealDescription,
          basePrice: basePrice,
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
