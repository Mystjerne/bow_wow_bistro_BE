const express = require("express");
const router = express.Router();

class MealRouter {
  constructor(mealController, checkJwt) {
    this.controller = mealController;
    this.checkJwt = checkJwt;
  }

  routes() {
    //get all meals data.
    router.get("/", this.controller.getAll.bind(this.controller));
    //get the data of one specific meal.
    router.get(
      "/:mealId",
      this.controller.getOneMealData.bind(this.controller)
    );
    //create a meal, add it to the list of all meals. add the meal_ingredients as well.
    router.post(
      "/",
      this.checkJwt,
      this.controller.addMeal.bind(this.controller)
    );
    //delete a meal's details (userId, mealName,mealPhoto,mealDescription,basePrice,availability) AND the meal_ingredients!
    router.delete("/:mealId", this.controller.deleteMeal.bind(this.controller));
    //update a meal's details (userId, mealName,mealPhoto,mealDescription,basePrice,availability) BUT NOT the meal_ingredients!
    router.put("/:mealId", this.controller.updateMeal.bind(this.controller));
    //subsitute a meal's ingredients. need to pass in the pk of the old ingredient and the pk of the new ingredient.
    router.put(
      "/:mealId/sub-meal-ingredient",
      this.controller.updateMealIngredient.bind(this.controller)
    );

    return router; // Return the router instance
  }
}

module.exports = MealRouter;
