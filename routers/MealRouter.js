const express = require("express");
const router = express.Router();

class MealRouter {
  constructor(mealController) {
    this.controller = mealController;
  }

  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post("/", this.controller.addMeal.bind(this.controller));
    router.put("/:mealId", this.controller.updateMeal.bind(this.controller));

    // router.post(
    //   "/:employerId/job",
    //   this.controller.addJobListing.bind(this.controller)
    // );
    // //for getting all job listings related to the employer
    // router.get(
    //   "/:employerId/job",
    //   this.controller.getJobListing.bind(this.controller)
    // );
    // //for getting the specific one joblisting with the id and the employer
    // router.get(
    //   "/:employerId/job/:jobListingId",
    //   this.controller.getOneJobListingApps.bind(this.controller)
    // );

    return router; // Return the router instance
  }
}

module.exports = MealRouter;
