require("dotenv").config();
//import express for reading json
const express = require("express");
const cors = require("cors");
//auth0 middleware
const { auth } = require("express-oauth2-jwt-bearer");
const checkJwt = auth({
  audience: "https://project-4/api",
  issuerBaseURL: `https://dev-pmc8jc5o1b6s0fa8.us.auth0.com/`,
});

const PORT = 3000;
const app = express();

//importing db
const db = require("./models/index");

const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const {
  cart,
  ingredients,
  meals,
  promotions,
  users,
  cart_meals,
  meal_ingredients,
  meal_promotions,
} = db;

//import controllers
const MealController = require("./controllers/MealController");
const PromoController = require("./controllers/PromoController");
const IngredientController = require("./controllers/IngredientController");
const CartController = require("./controllers/CartController");
const UserController = require("./controllers/UserController");
const StripeController = require("./controllers/StripeController");

//import routers
const MealRouter = require("./routers/MealRouter");
const PromoRouter = require("./routers/PromoRouter");
const IngredientRouter = require("./routers/IngredientRouter");
const CartRouter = require("./routers/CartRouter");
const UserRouter = require("./routers/UserRouter");
const StripeRouter = require("./routers/StripeRouter");

//pass in db models to controllers when initalized
const mealController = new MealController(meals, ingredients, meal_ingredients);
const promoController = new PromoController(promotions);
const ingredientController = new IngredientController(ingredients);
const cartController = new CartController(cart, meals, cart_meals, ingredients);
const userController = new UserController(users);
const stripeController = new StripeController(meals, ingredients, stripe);

//pass in the controllers to the routers, then initalize the routers
const mealRouter = new MealRouter(mealController, checkJwt).routes();
const promoRouter = new PromoRouter(promoController, checkJwt).routes();
const ingredientRouter = new IngredientRouter(
  ingredientController,
  checkJwt
).routes();
const cartRouter = new CartRouter(cartController, checkJwt).routes();
const userRouter = new UserRouter(userController, checkJwt).routes();
const stripeRouter = new StripeRouter(stripeController, checkJwt).routes();

//pass in checkJwt as a second argument when implementing auth0.

//Enable cors access to the server
app.use(cors());
app.use(express.json());
app.use("/ingredients", ingredientRouter);
app.use("/meals", mealRouter);
app.use("/promotions", promoRouter);
app.use("/cart", cartRouter);
app.use("/users", userRouter);
app.use("/stripe", stripeRouter);

//instead of hard coding these, gotta figure out a way to query the backend for the relevant data and then map it out?
//yes, i know this is already the backend

var storeItems = new Map([
  [1, { priceInCents: 1200, name: "Salmon Snout Smacker" }],
  [2, { priceInCents: 1600, name: "Big Beefy Bowl" }],
  [3, { priceInCents: 1600, name: "Turkey Treat" }],
  [4, { priceInCents: 1600, name: "Cod Crunch" }],
  [5, { priceInCents: 1200, name: "Pork Potato Platter" }],
  [6, { priceInCents: 1200, name: "Chicken Casserole" }],
]);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
// app.post("/stripe", async (req, res) => {
//   console.log("req.body: ", req.body);
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: req.body.itemsToPurchase[0].items.map((item) => {
//         const storeItem = storeItems.get(item.id);
//         return {
//           price_data: {
//             currency: "sgd",
//             product_data: {
//               name: storeItem.name,
//             },
//             unit_amount: storeItem.priceInCents,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       mode: "payment",
//       success_url: `${process.env.FE_STRIPE_SUCCESS_URL}`,
//       cancel_url: `${process.env.FE_STRIPE_FAILURE_URL}`,
//     });
//     res.json({ url: session.url });
//   } catch (error) {
//     return res.status(500).json({ error: error });
//   }
// });
