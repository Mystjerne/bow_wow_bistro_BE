const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(userController) {
    this.controller = userController;
  }

  routes() {
    router.post("/", this.controller.addUser.bind(this.controller));

    router.post(
      "/check",
      this.controller.checkUserExists.bind(this.controller)
    );

    return router; // Return the router instance
  }
}

module.exports = UserRouter;
