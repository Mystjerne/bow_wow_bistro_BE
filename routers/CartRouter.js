const express = require("express");
const router = express.Router();

class CartRouter {
  constructor(cartController, checkJwt) {
    this.controller = cartController;
    this.checkJwt = checkJwt;
  }

  routes() {
    //get all carts (including ones the user is not associated with)
    router.get(
      "/",
      this.checkJwt,
      this.controller.getAll.bind(this.controller)
    );
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

    //post a meal to the user's cart meals.
    router.post(
      "/:userId/current",
      this.controller.addUserCurrentCartMeals.bind(this.controller)
    );

    //delete a single meal from a user's current cart meals.
    router.delete(
      "/:userId/current",
      this.controller.deleteOneUserCurrentCartMeal.bind(this.controller)
    );

    return router; // Return the router instance
  }
}

module.exports = CartRouter;
