require("dotenv").config();
//import express for reading json
const express = require("express");
const cors = require("cors");

//auth0 middleware
const { auth } = require("express-oauth2-jwt-bearer");

const PORT = 3000;
const app = express();

//importing db
const db = require("./models/index");

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

//import routers
const MealRouter = require("./routers/MealRouter");
const PromoRouter = require("./routers/PromoRouter");
const IngredientRouter = require("./routers/IngredientRouter");
const CartRouter = require("./routers/CartRouter");

//pass in db models to controllers when initalized
const mealController = new MealController(meals, ingredients, meal_ingredients);
const promoController = new PromoController(promotions);
const ingredientController = new IngredientController(ingredients);
const cartController = new CartController(cart, meals, cart_meals);

//pass in the controllers to the routers, then initalize the routers
const mealRouter = new MealRouter(mealController).routes();
const promoRouter = new PromoRouter(promoController).routes();
const ingredientRouter = new IngredientRouter(ingredientController).routes();
const cartRouter = new CartRouter(cartController).routes();
//pass in checkJwt as a second argument when implementing auth0.

app.use(express.json());
app.use("/ingredients", ingredientRouter);
app.use("/meals", mealRouter);
app.use("/promotions", promoRouter);
app.use("/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
