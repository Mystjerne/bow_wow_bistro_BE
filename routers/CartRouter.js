const express = require("express");
const router = express.Router();

class CartRouter {
  constructor(cartController) {
    this.controller = cartController;
  }

  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    //add a new cart after a user completes their order
    router.post("/", this.controller.addCart.bind(this.controller));
    //get all carts associated with the user, whether completed or not. for transaction history
    router.get("/:userId", this.controller.getUserCarts.bind(this.controller));

    //update the cart's completed and totalPrice value, as long as the cart is not completed
    router.put("/:userId", this.controller.updateCart.bind(this.controller));

    //get all the meals the current user's cart is associated with
    router.get(
      "/:userId/current",
      this.controller.getUserCurrentCartMeals.bind(this.controller)
    );

    router.post(
      "/:userId/current",
      this.controller.addUserCurrentCartMeals.bind(this.controller)
    );

    // router.post("/", this.controller.addIngredient.bind(this.controller));

    // router.put(
    //   "/:ingredientId",
    //   this.controller.updateIngredient.bind(this.controller)
    // );

    return router; // Return the router instance
  }
}

module.exports = CartRouter;
