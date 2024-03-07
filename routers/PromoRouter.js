const express = require("express");
const router = express.Router();

class PromoRouter {
  constructor(promoController) {
    this.controller = promoController;
  }

  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post("/", this.controller.addPromo.bind(this.controller));
    router.put("/:promoId", this.controller.updatePromo.bind(this.controller));

    return router; // Return the router instance
  }
}

module.exports = PromoRouter;
