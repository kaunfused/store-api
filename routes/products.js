const express = require("express");
const router = express.Router();

const productControl = require("../controllers/products");

router.get("/", productControl.getAllProducts);

module.exports = router;
