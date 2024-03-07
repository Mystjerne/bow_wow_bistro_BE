const express = require("express");
const router = express.Router();

class IngredientRouter {
  constructor(ingredientController) {
    this.controller = ingredientController;
  }

  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post("/", this.controller.addIngredient.bind(this.controller));
    router.put(
      "/:ingredientId",
      this.controller.updateIngredient.bind(this.controller)
    );

    return router; // Return the router instance
  }
}

module.exports = IngredientRouter;
