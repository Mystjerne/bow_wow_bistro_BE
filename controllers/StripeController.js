const BaseController = require("./BaseController");

class StripeController extends BaseController {
  constructor(model, ingredientModel, stripe) {
    super(model);
    this.mealModel = model;
    this.ingredientModel = ingredientModel;
    this.stripe = stripe;

    this.storeItems = new Map([]);
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

    //the ids of the items that are being bought have been sent over.
    //1. i need to calculate the prices of all the items that have been sent over. -> take the id of these meals, findbypk?
    //2. I need to convert that price into it's price in cents.
    //3. put it all in a var/array. replace line item's req.body.itemsToPurchase with it.
    //???
    //profit
    //req.body.itemsToPurchase[0].items is an array containing objects with an id and a quantity property.
    var itemids = req.body.itemsToPurchase[0].items.map((item) => {
      return item.id;
    });

    const MealsWithIngredients = await this.model.findAll({
      where: { id: itemids },
      include: [
        {
          model: this.ingredientModel,
        },
      ],
    });

    console.log("i am itemids", itemids);
    console.log("i am mealswithingredients", MealsWithIngredients);

    const mealsWithPrices = MealsWithIngredients.map((meal) => {
      const mealPrice = meal.ingredients.reduce((total, ingredient) => {
        return total + ingredient.additionalPrice;
      }, 0);

      // Attach the calculated price as a new property to the meal object
      return { ...meal.toJSON(), mealPriceInCents: mealPrice * 100 };
    });

    console.log("i am meals with prices", mealsWithPrices);

    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: mealsWithPrices.map((mealwithprice) => {
          // const storeItem = mealsWithPrices.get(mealwithprice.id);
          return {
            price_data: {
              currency: "sgd",
              product_data: {
                name: mealwithprice.mealName,
              },
              unit_amount: mealwithprice.mealPriceInCents,
            },
            quantity: 1,
          };
        }),
        mode: "payment",
        // http://yoursite.com/order/success?session_id={CHECKOUT_SESSION_ID}
        success_url:
          `${process.env.FE_STRIPE_SUCCESS_URL}` +
          "?session_id={CHECKOUT_SESSION_ID}",
        cancel_url:
          `${process.env.FE_STRIPE_FAILURE_URL}` +
          "?session_id={CHECKOUT_SESSION_ID}",
      });
      return res.json({ url: session.url });
    } catch (error) {
      console.log("error with creating stripe checkout session");
      return res.status(500).json({ error: error });
    }
  }

  async handleStripeSuccess(req, res) {
    try {
      console.log("Stripe success method called");
      const session = await this.stripe.checkout.sessions.retrieve(
        req.query.session_id
      );
      const customer = await this.stripe.customers.retrieve(session.customer);
      console.log("i am session.customer:", session.customer);
      return res.send(
        `<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`
      );
    } catch (error) {
      console.error("Error handling Stripe success:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async handleStripeFailure(req, res) {
    try {
      console.log("Stripe FAILURE method called");
      const session = await this.stripe.checkout.sessions.retrieve(
        req.query.session_id
      );
      const customer = await this.stripe.customers.retrieve(session.customer);
      return res.status(500).json({
        error: "something went wrong!",
        session: session,
        customer: customer,
      });
    } catch (error) {
      console.error("Error handling Stripe failure:", error);
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = StripeController;
