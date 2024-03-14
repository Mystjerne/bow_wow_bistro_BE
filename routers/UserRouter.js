const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(userController, checkJwt) {
    this.controller = userController;
    this.checkJwt = checkJwt;
  }

  routes() {
    router.post("/", this.controller.addUser.bind(this.controller));

    router.post(
      "/check",
      this.checkJwt,
      this.controller.checkUserExists.bind(this.controller)
    );

    return router; // Return the router instance
  }
}

module.exports = UserRouter;
