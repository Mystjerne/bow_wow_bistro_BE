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

//import routers
const MealRouter = require("./routers/MealRouter");
const PromoRouter = require("./routers/PromoRouter");

//pass in db models to controllers when initalized
const mealController = new MealController(meals, ingredients, meal_ingredients);
const promoController = new PromoController(promotions);

//pass in the controllers to the routers, then initalize the routers
const mealRouter = new MealRouter(mealController).routes;
const promoRouter = new PromoRouter(promoController).routes;

//pass in checkJwt as a second argument when implementing auth0.

app.use("/meals", MealRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
