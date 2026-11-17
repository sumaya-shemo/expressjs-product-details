const express = require("express");
const path = require("path");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/products", productRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

module.exports = app;