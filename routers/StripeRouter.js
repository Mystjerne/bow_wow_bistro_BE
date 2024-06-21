const express = require("express");
const router = express.Router();

class StripeRouter {
  constructor(stripeController, checkJwt) {
    this.controller = stripeController;
    this.checkJwt = checkJwt;
  }

  routes() {
    router.post(
      "/",
      this.controller.createCheckoutSession.bind(this.controller)
    );

    router.get(
      "/pop-store-items",
      this.controller.populateStripeStoreItems.bind(this.controller)
    );

    router.get(
      "/success",
      this.controller.handleStripeSuccess.bind(this.controller)
    );

    router.get(
      "/failure",
      this.controller.handleStripeFailure.bind(this.controller)
    );

    return router; // Return the router instance
  }
}

module.exports = StripeRouter;
