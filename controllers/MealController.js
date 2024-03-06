const BaseController = require("./BaseController");

//Add a photo url link?
class MealController extends BaseController {
  constructor(model, mealModel, ingredientModel, mealIngredientsModel) {
    super(model);
    this.mealModel = mealModel;
    //is this.model equal to mealModel, or is this.mealModel equal to mealModel?
    this.ingredientModel = ingredientModel;
    this.mealIngredientsModel = mealIngredientsModel;
  }

  async addIngredient(req, res) {
    const {
      ingredient_name,
      category,
      additional_price,
      availability,
      add_on,
    } = req.body;
    try {
      // Create new meal
      const newIngredient = await this.ingredientModel.create({
        ingredient_name: ingredient_name,
        category: category,
        additional_price: additional_price,
        availability: availability,
        add_on: add_on,
      });
      // Respond with new meal
      return res.json(newIngredient);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async updateIngredient(req, res) {
    const {
      ingredient_name,
      category,
      additional_price,
      availability,
      add_on,
    } = req.body;
    const { ingredientId } = req.params;
    //if mealID /= in the list of meals, should throw error and not be able to update

    try {
      let ingredient_data = await this.ingredientModel.findOne({
        where: { id: ingredientId },
      });
      if (ingredient_data == null) {
        throw new Error(
          "Ingredient you are trying to edit does not exist in the database."
        );
      }
      await this.model.update(
        {
          ingredient_name: ingredient_name,
          category: category,
          additional_price: additional_price,
          availability: availability,
          add_on: add_on,
        },
        {
          where: {
            id: ingredientId,
          },
        }
      );
      const output = await this.ingredientModel.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Create MEAL
  async addMeal(req, res) {
    //Adding new basic new meal.
    const {
      user_id,
      meal_name,
      meal_photo,
      meal_description,
      base_price,
      availability,
      ingredients,
    } = req.body;
    try {
      // Create new meal
      const newMeal = await this.model.create({
        user_id: user_id,
        meal_name: meal_name,
        meal_photo: meal_photo,
        meal_description: meal_description,
        base_price: base_price,
        availability: availability,
      });
      //add entries to meal_ingredients.
      //ingredients contains an array of ingredientIDs. We don't know the length of it yet.
      try {
        for (let ingredientId in ingredients) {
          const ingredient = await this.model.findByPk(ingredientId);
          if (!ingredient) {
            return res.status(404).json({
              error: true,
              msg: "Cannot add the ingredient for this meal. There is no ingredient with the provided ID.",
            });
          }
        }
        const addMealIngredient = await this.mealIngredientsModel.findAll({
          where: {
            id: ingredients,
          },
        });

        await addMealIngredient.setMealIngredient(addMealIngredient);

        return res.json(addMealIngredient, newMeal);
      } catch (err) {
        return res.status(400).json({ error: true, msg: err });
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Edit and Update meal
  async updateMeal(req, res) {
    const {
      user_id,
      meal_name,
      meal_photo,
      meal_description,
      base_price,
      availability,
    } = req.body;
    const { mealId } = req.params;
    //if mealID /= in the list of meals, should throw error and not be able to update
    try {
      let meal_data = await this.model.findOne({
        where: { id: mealId },
      });
      if (meal_data == null) {
        throw new Error(
          "Meal you are trying to edit does not exist in the database."
        );
      }
      await this.model.update(
        {
          user_id: user_id,
          meal_name: meal_name,
          meal_photo: meal_photo,
          meal_description: meal_description,
          base_price: base_price,
          availability: availability,
        },
        {
          where: {
            id: mealId,
          },
        }
      );
      const output = await this.model.findAll();

      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // <------------------------ JOB LISTING ------------------------ >

  async addJobListing(req, res) {
    const { employerId } = req.params;
    const {
      jobTitle,
      description,
      jobResponsibility,
      skillSet,
      applicationStartDate,
      applicationEndDate,
    } = req.body;

    try {
      //tag to employerID
      const newJobListing = await this.jobListingModel.create({
        jobTitle: jobTitle,
        description: description,
        jobResponsibility: jobResponsibility,
        skillSet: skillSet,
        applicationStartDate: applicationStartDate,
        applicationEndDate: applicationEndDate,
        employerId: employerId,
      });
      // Respond with the new work experience
      {
        const { employerId } = req.params;
        const { benefit1, benefit2, benefit3 } = req.body;

        try {
          // Check if the talent exists
          console.log("req.body", req.body);
          const employer = await this.model.findByPk(employerId);
          if (!employer) {
            return res
              .status(404)
              .json({ error: true, msg: "Employer not found" });
          }
          // Create a new benefit and associate it with the talent
          const addJobListingBenefit = await this.benefitModel.findAll({
            where: {
              id: [benefit1, benefit2, benefit3],
            },
          });
          await newJobListing.setBenefits(addJobListingBenefit);
          // Respond with the newly created benefit
          return res.json(addJobListingBenefit);
        } catch (err) {
          return res.status(400).json({ error: true, msg: err });
        }
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getJobListing(req, res) {
    console.log("getJobListing is being called");
    const { employerId } = req.params;
    try {
      //tag to talent ID
      const jobListing = await this.jobListingModel.findAll({
        where: {
          employerId: employerId,
        },
      });
      // Respond with the new work experience
      return res.json(jobListing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOneJobListingApps(req, res) {
    console.log("req.params in getOneJobListing:", req.params);
    const { employerId, jobListingId } = req.params;

    try {
      //tag to talent ID
      const jobListing = await this.jobListingModel.findByPk(jobListingId);

      const appsForJobListing = await jobListing.getApplications();
      console.log("i am apps for job listing", appsForJobListing);

      console.log("jobListing", jobListing);
      console.log("applications for job listing", appsForJobListing);
      const response = {
        applications: appsForJobListing,
        jobListing: jobListing,
      };

      return res.json(response);
    } catch (err) {
      console.log("err", err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
  //return res.json(jobListing);
  //get all applications relating to the job listing.
  //-> get the id of all applications that have a specific job listing id
  //use stuff from the documentation
}

//Employer Dashboard should get all job listings posted by the employer.
//Clicking on a job listing should bring the employer to a page where they can reject or accept applications associated with the job listing.

// get all user info under base controller
// delete is not required - user can't delete profile

module.exports = MealController;
