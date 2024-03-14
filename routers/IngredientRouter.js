const express = require("express");
const router = express.Router();

class IngredientRouter {
  constructor(ingredientController, checkJwt) {
    this.controller = ingredientController;
    this.checkJwt = checkJwt;
  }

  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post(
      "/",
      this.checkJwt,
      this.controller.addIngredient.bind(this.controller)
    );
    router.put(
      "/:ingredientId",
      this.controller.updateIngredient.bind(this.controller)
    );

    return router; // Return the router instance
  }
}

module.exports = IngredientRouter;
