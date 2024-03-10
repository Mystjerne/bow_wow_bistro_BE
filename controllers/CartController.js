const BaseController = require("./BaseController");

//Add a photo url link?
class CartController extends BaseController {
  constructor(model, mealModel, cartMealModel) {
    super(model);
    this.mealModel = mealModel;
    this.cartMealModel = cartMealModel;
  }

  //method to get all carts associated with the user, including completed ones.
  //tested
  async getUserCarts(req, res) {
    console.log("getUserCarts is being called.");
    const { userId } = req.params;

    const carts = await this.model.findAll({
      where: { userId: userId },
    });

    return res.json(carts);
  }

  //tested
  //after cart is changed to be completed, make a new cart that's empty of any meals.
  async addCart(req, res) {
    const { userId, totalPrice, completed } = req.body;
    //total price is supposed to be 0.
    //completed is supposed to be false.
    //userId is the id of the person who is logged in right now
    try {
      const newCart = await this.model.create({
        userId: userId,
        totalPrice: totalPrice,
        completed: completed,
      });
      return res.json(newCart);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //update the details of the cart (mark it as completed, change the total price etc)
  //tested
  async updateCart(req, res) {
    console.log("updateCart is being called.");
    const { completed, totalPrice } = req.body;
    const { userId } = req.params;

    console.log("userId", userId);
    try {
      let cart_data = await this.model.findOne({
        where: { userId: userId, completed: false },
      });
      if (cart_data == null) {
        throw new Error(
          "Cart you are trying to edit does not exist in the database."
        );
      }
      console.log("i got past the error handling");
      await this.model.update(
        {
          userId: userId,
          totalPrice: totalPrice,
          completed: completed,
        },
        {
          where: {
            userId: userId,
            completed: false,
          },
        }
      );
      console.log("i got past model.update");

      const updatedCart = await this.model.findOne({
        where: {
          userId: userId,
          completed: completed,
        },
      });

      return res.json(updatedCart);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  //method to get the cart with the correct userid
  //get the cart id
  //get all of the rows with that cartid and where the completed is not true
  //tested.
  async getUserCurrentCartMeals(req, res) {
    console.log("getUserCurrentCartMeals is being called.");
    const { userId } = req.params;

    const cart = await this.model.findOne({
      where: { userId: userId, completed: false },
    });

    const current_cart_id = cart.id;

    console.log("current_cart_id", current_cart_id);
    const current_cart_meals = await this.cartMealModel.findAll({
      where: { cartId: current_cart_id },
    });

    console.log("current_cart_meals", current_cart_meals);
    return res.json(current_cart_meals);
  }

  async addUserCurrentCartMeals(req, res) {
    console.log("updateUserCurrentCartMeals is being called.");
    const { mealId } = req.body;

    const { userId } = req.params;

    const cart = await this.model.findOne({
      where: { userId: userId, completed: false },
    });

    const current_cart_id = cart.id;

    console.log("current_cart_id", current_cart_id);

    const new_cart_meals_entry = await this.cartMealModel.create({
      cartId: current_cart_id,
      mealId: mealId,
    });

    return res.json(new_cart_meals_entry);
  }
}

//   // Create MEAL
//   async addMealtoCart(req, res) {
//     //Adding new basic new meal.
//     const {
//       userId,
//       mealName,
//       mealPhoto,
//       mealDescription,
//       basePrice,
//       availability,
//       ingredients,
//     } = req.body;
//     console.log(req.body, "i am meal name:", mealName);
//     try {
//       // Create new meal
//       const newMeal = await this.model.create({
//         userId: userId,
//         mealName: mealName,
//         mealPhoto: mealPhoto,
//         mealDescription: mealDescription,
//         basePrice: basePrice,
//         availability: availability,
//       });

//       //after adding in a new meal, get the new meal id so we can can put it into meal_ingredients.

//       //add entries to meal_ingredients.
//       //ingredients contains an array of ingredientIDs. We don't know the length of it yet.
//       try {
//         for (let ingredientIndex in ingredients) {
//           console.log(
//             "ingredients[ingredientIndex],: ",
//             ingredients[ingredientIndex]
//           );

//           var new_ingredient_pk = ingredients[ingredientIndex];

//           var ingredient = await this.ingredientModel.findByPk(
//             new_ingredient_pk
//           );

//           if (!ingredient) {
//             console.log("Can't find the ingredient in the ingredient list.");
//             return res.status(404).json({
//               error: true,
//               msg: "Cannot add the ingredient for this meal. There is no ingredient with the provided ID.",
//             });
//           }

//           console.log("i am new ingredient id", new_ingredient_pk);
//           console.log("i am newMeal.id: ", newMeal.id);
//           const addMealIngredient = await this.mealIngredientsModel.create({
//             mealId: newMeal.id,
//             ingredientId: new_ingredient_pk,
//             required: false,
//             added: false,
//           });
//           console.log(addMealIngredient.toJSON());
//         }

//         return res.json(newMeal);
//       } catch (err) {
//         console.log("error with ingredient try block", err);
//         return res.status(400).json({ error: true, msg: err });
//       }
//     } catch (err) {
//       console.log("error with meal try block");
//       return res.status(400).json({ error: true, msg: err });
//     }
//   }

//   //update meal (but not meal ingredients!)
//   async updateMeal(req, res) {
//     const {
//       userId,
//       mealName,
//       mealPhoto,
//       mealDescription,
//       basePrice,
//       availability,
//     } = req.body;
//     const { mealId } = req.params;

//     //if mealID /= in the list of meals, should throw error and not be able to update
//     try {
//       let meal_data = await this.model.findOne({
//         where: { id: mealId },
//       });
//       if (meal_data == null) {
//         throw new Error(
//           "Meal you are trying to edit does not exist in the database."
//         );
//       }
//       await this.model.update(
//         {
//           userId: userId,
//           mealName: mealName,
//           mealPhoto: mealPhoto,
//           mealDescription: mealDescription,
//           basePrice: basePrice,
//           availability: availability,
//         },
//         {
//           where: {
//             id: mealId,
//           },
//         }
//       );
//       const output = await this.model.findAll();

//       return res.json(output);
//     } catch (err) {
//       return res.status(400).json({ error: true, msg: err.message });
//     }
//   }

//   async updateMealIngredient(req, res) {
//     //This is called when the someone is subsituting a meal ingredient.
//     //need to also have a method for just adding a meal ingredient?
//     console.log("update mealingredients is being called.");
//     const { old_ingredient, ingredient, category } = req.body;
//     //ingredient is the id of the ingredient that is replacing the old_ingredient.
//     const { mealId } = req.params;

//     //check to see if new ingredient even exists in the ingredient database.
//     try {
//       let ingredient_data = await this.ingredientModel.findOne({
//         where: { id: ingredient, category: category },
//       });
//       if (ingredient_data == null) {
//         throw new Error(
//           "Ingredient you are trying to subtitute either does not exist in the database, or is not the same category as the old ingredient and cannot be used as a substitute."
//         );
//       }
//       //update the entry in the meal-ingredient table that has an mealid of the request.body's mealid AND
//       //has an ingredientId that is the same as the one we're trying to replace.

//       //update returns the number of rows affected by the update operation, not the actual updated rows.
//       await this.mealIngredientsModel.update(
//         {
//           mealId: mealId,
//           ingredientId: ingredient,
//         },
//         {
//           where: {
//             mealId: mealId,
//             ingredientId: old_ingredient,
//           },
//         }
//       );

//       //fetch the updated meal ingredient.
//       const updatedMealIngredient = await this.mealIngredientsModel.findOne({
//         where: {
//           mealId: mealId,
//           ingredientId: ingredient,
//         },
//       });
//       // const output = await this.mealIngredientsModel.findAll();

//       return res.json(updatedMealIngredient);
//     } catch (err) {
//       return res.status(400).json({ error: true, msg: err.message });
//     }
//   }

//   async deleteMeal(req, res) {
//     console.log("deleteMeal is being called.");
//     const { mealId } = req.params;
//     console.log("i am mealId in deleteMeal", mealId);
//     try {
//       //delete the meal_ingredients first
//       const meal_ingredients_to_delete =
//         await this.mealIngredientsModel.findAll({
//           where: {
//             mealId: mealId,
//           },
//         });

//       console.log("meal_ingredients_to_delete:", meal_ingredients_to_delete);

//       for (const mealIngredient of meal_ingredients_to_delete) {
//         await mealIngredient.destroy();
//       }

//       const meal_to_delete = await this.model.findOne({
//         where: {
//           id: mealId,
//         },
//       });

//       if (!meal_to_delete) {
//         return res.status(404).json({ error: true, msg: "Meal not found" });
//       }

//       // Delete the skill set
//       await meal_to_delete.destroy();

//       return res.json({
//         success: true,
//         msg: "Meal and it's associated ingredients deleted successfully",
//       });
//     } catch (err) {
//       return res.status(400).json({ error: true, msg: err.message });
//     }
//   }
// }

module.exports = CartController;
