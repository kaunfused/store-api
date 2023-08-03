require("dotenv").config();

const jsonProd = require("./products.json");
const db = require("./db/connect");
const Product = require("./models/product");

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nodeexpress.isko1mi.mongodb.net/store-api?retryWrites=true&w=majority`;

const start = async () => {
  try {
    await db(url);
    await Product.deleteMany();
    await Product.create(jsonProd);
    process.exit(0);
  } catch (error) {
    console.log("Could not start server...");
    process.exit(0);
  }
};

start();
