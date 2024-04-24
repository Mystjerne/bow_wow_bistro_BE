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

    return router; // Return the router instance
  }
}

module.exports = StripeRouter;
