// server.js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// API endpoint to calculate total value of products
app.post("/api/products/total", (req, res) => {
  const products = req.body; // Expecting an array of product objects

  // Validate input
  if (!Array.isArray(products)) {
    return res
      .status(400)
      .json({ error: "Input must be an array of products." });
  }

  let totalValue = 0;

  // Calculate total value
  products.forEach((product) => {
    const { name, price, quality } = product;

    // Validate each product object
    if (
      typeof name !== "string" ||
      typeof price !== "number" ||
      typeof quality !== "string"
    ) {
      return res
        .status(400)
        .json({
          error: "Each product must have a valid name, price, and quality.",
        });
    }

    totalValue += price; // Sum the prices
  });

  // Return the total value
  res.json({ totalValue });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
