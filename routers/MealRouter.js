const express = require("express");
const router = express.Router();

class MealRouter {
  constructor(mealController) {
    this.controller = mealController;
  }

  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post("/", this.controller.addMeal.bind(this.controller));
    router.put("/:mealId", this.controller.updateMeal.bind(this.controller));

    return router; // Return the router instance
  }
}

module.exports = MealRouter;
