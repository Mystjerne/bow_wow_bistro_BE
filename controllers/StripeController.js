const BaseController = require("./BaseController");

class StripeController extends BaseController {
  constructor(model, ingredientModel, stripe) {
    super(model);
    this.mealModel = model;
    this.ingredientModel = ingredientModel;
    this.stripe = stripe;

    this.storeItems = new Map([
      [1, { priceInCents: 1200, name: "Salmon Snout Smacker" }],
      [2, { priceInCents: 1600, name: "Big Beefy Bowl" }],
      [3, { priceInCents: 1600, name: "Turkey Treat" }],
      [4, { priceInCents: 1600, name: "Cod Crunch" }],
      [5, { priceInCents: 1200, name: "Pork Potato Platter" }],
      [6, { priceInCents: 1200, name: "Chicken Casserole" }],
    ]);

    this.storeItems = new Map([]);
    //map the populated storeitems after every addition of a meal.
    //make sure the cart includes the ids of the meals (aka the ids of the storeItems)
    //so that when we make a transaction we can format the Create Checkout Session properly
  }

  async populateStripeStoreItems(req, res) {
    //get the id, the priceincents, and the name of all the restaurant items.
    //get the prices of all the menu items.
    //get the id of all the menu items.
    //map them out.

    try {
      const MealsWithIngredients = await this.mealModel.findAll({
        include: [
          {
            model: this.ingredientModel,
          },
        ],
      });

      console.log("MealsWithIngredients:", MealsWithIngredients);

      const mealsWithPrices = MealsWithIngredients.map(async (meal) => {
        const mealPrice = meal.ingredients.reduce((total, ingredient) => {
          return total + ingredient.additionalPrice;
        }, 0);

        // Attach the calculated price as a new property to the meal object
        this.storeItems.set(meal.id, {
          priceInCents: mealPrice * 100,
          name: meal.mealName,
        });
      });

      // Wait for all promises to resolve
      await Promise.all(mealsWithPrices);

      console.log("storeitems:", this.storeItems);

      // Convert the map to an object before sending the response
      const storeItemsObject = Object.fromEntries(this.storeItems);

      return res.json(storeItemsObject);
    } catch (err) {
      console.log("Error with getting all basic meals.");
      res.status(400).json({ error: true, msg: err });
    }
  }

  // Create checkout session
  async createCheckoutSession(req, res) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: req.body.itemsToPurchase[0].items.map((item) => {
          const storeItem = this.storeItems.get(item.id);
          return {
            price_data: {
              currency: "sgd",
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.priceInCents,
            },
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `${process.env.FE_STRIPE_SUCCESS_URL}`,
        cancel_url: `${process.env.FE_STRIPE_FAILURE_URL}`,
      });
      res.json({ url: session.url });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}

module.exports = StripeController;
// async getAllBasicMealsAndTheirPrices(req, res) {
//   try {
//     const MealsWithIngredients = await this.mealModel.findAll({
//       include: [
//         {
//           model: this.ingredientModel,
//         },
//       ],
//     });

//     console.log(MealsWithIngredients);

//     const mealsWithPrices = MealsWithIngredients.map((meal) => {
//       const mealPrice = meal.ingredients.reduce((total, ingredient) => {
//         return total + ingredient.additionalPrice;
//       }, 0);

//       // Attach the calculated price as a new property to the meal object
//       return { ...meal.toJSON(), mealPrice };
//     });

//     return res.json(mealsWithPrices);
//   } catch (err) {
//     console.log("Error with getting all basic meals.");
//     res.status(400).json({ error: true, msg: err });
//   }
// }
