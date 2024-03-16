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
      this.checkJwt,
      this.controller.updateIngredient.bind(this.controller)
    );

    //get all ingredients with the correct category
    router.get("/meat", this.controller.getAllMeat.bind(this.controller));
    router.get("/fruit", this.controller.getAllFruit.bind(this.controller));
    router.get(
      "/vegetable",
      this.controller.getAllVegetable.bind(this.controller)
    );
    router.get("/carbs", this.controller.getAllCarbs.bind(this.controller));
    return router;
  }
}

module.exports = IngredientRouter;
