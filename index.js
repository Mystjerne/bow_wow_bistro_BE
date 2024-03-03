require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { auth } = require("express-oauth2-jwt-bearer");

const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
