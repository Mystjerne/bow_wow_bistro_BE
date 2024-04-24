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

  // Edit and Update meal
  async updatePromo(req, res) {
    const { user_id, meal_name, meal_description, base_price, availability } =
      req.body;
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
}

module.exports = StripeController;
