const BaseController = require("./BaseController");

//Add a photo url link?
class MealController extends BaseController {
  constructor(model, ingredientModel, mealIngredientsModel) {
    super(model);
    this.ingredientModel = ingredientModel;
    this.mealIngredientsModel = mealIngredientsModel;
  }

  //get the data of one specific meal and it's ingredients IN PRIMARY KEY FORM
  async getOneMealIngredsByPk(req, res) {
    const { mealId } = req.params;
    try {
      const OneMealData = await this.model.findOne({
        where: { id: mealId },
        include: [
          {
            model: this.ingredientModel,
          },
        ],
      });

      const one_meal_ingredients = OneMealData.ingredients;
      var array_of_meal_ingredients_pk = [];
      for (let x = 0; x < one_meal_ingredients.length; x++) {
        array_of_meal_ingredients_pk.push(one_meal_ingredients[x].id);
      }

      return res.json(array_of_meal_ingredients_pk);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //get the data of one specific meal and it's ingredients IN OBJECT FORM
  async getOneMealData(req, res) {
    const { mealId } = req.params;
    try {
      const OneMealData = await this.model.findOne({
        where: { id: mealId },
        include: this.ingredientModel,
      });

      return res.json(OneMealData);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
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

  //update meal (but not meal ingredients!)
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

  async updateMealIngredient(req, res) {
    //This is called when the someone is subsituting a meal ingredient.
    //need to also have a method for just adding a meal ingredient?
    console.log("update mealingredients is being called.");
    const { old_ingredient, ingredient } = req.body;
    //ingredient is the id of the ingredient that is replacing the old_ingredient.
    const { mealId } = req.params;

    try {
      // Find the primary keys (IDs) of the old and new ingredients based on their names
      const oldIngredientData = await this.ingredientModel.findOne({
        where: { ingredientName: old_ingredient },
      });

      const newIngredientData = await this.ingredientModel.findOne({
        where: { ingredientName: ingredient },
      });

      // Check if both ingredients exist in the database and are of the same category
      if (!oldIngredientData || !newIngredientData) {
        throw new Error(
          "One or both of the ingredients you are trying to substitute do not exist in the database, or they are not the same category as specified."
        );
      }

      //check to see if new ingredient even exists in the ingredient database.
      // try {
      //   let ingredient_data = await this.ingredientModel.findOne({
      //     where: { id: ingredient, category: category },
      //   });
      //   if (ingredient_data == null) {
      //     throw new Error(
      //       "Ingredient you are trying to subtitute either does not exist in the database, or is not the same category as the old ingredient and cannot be used as a substitute."
      //     );
      //   }
      //update the entry in the meal-ingredient table that has an mealid of the request.body's mealid AND
      //has an ingredientId that is the same as the one we're trying to replace.

      //update returns the number of rows affected by the update operation, not the actual updated rows.
      await this.mealIngredientsModel.update(
        {
          mealId: mealId,
          ingredientId: newIngredientData.id,
        },
        {
          where: {
            mealId: mealId,
            ingredientId: oldIngredientData.id,
          },
        }
      );

      //fetch the updated meal ingredient.
      const updatedMealIngredient = await this.mealIngredientsModel.findOne({
        where: {
          mealId: mealId,
          ingredientId: ingredient,
        },
      });
      // const output = await this.mealIngredientsModel.findAll();

      return res.json(updatedMealIngredient);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async deleteMeal(req, res) {
    console.log("deleteMeal is being called.");
    const { mealId } = req.params;
    console.log("i am mealId in deleteMeal", mealId);
    try {
      //delete the meal_ingredients first
      const meal_ingredients_to_delete =
        await this.mealIngredientsModel.findAll({
          where: {
            mealId: mealId,
          },
        });

      console.log("meal_ingredients_to_delete:", meal_ingredients_to_delete);

      for (const mealIngredient of meal_ingredients_to_delete) {
        await mealIngredient.destroy();
      }

      const meal_to_delete = await this.model.findOne({
        where: {
          id: mealId,
        },
      });

      if (!meal_to_delete) {
        return res.status(404).json({ error: true, msg: "Meal not found" });
      }

      // Delete the skill set
      await meal_to_delete.destroy();

      return res.json({
        success: true,
        msg: "Meal and it's associated ingredients deleted successfully",
      });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = MealController;
