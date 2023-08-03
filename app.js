const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const db = require("./db/connect");

const app = express();
const port = process.env.PORT || 3000;

const router = require("./routes/products");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>Store API</h1>");
});

app.use("/api/v1/products", router);

const start = async () => {
  try {
    await db();
    app.listen(port, () => {
      console.log(`Server listening at port ${port}...`);
    });
  } catch (error) {
    console.log("Could not start server...");
  }
};

start();
