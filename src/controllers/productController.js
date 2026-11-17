const products = require("../../data/products.json");

function getAllProducts(req, res) {
  const search = (req.query.search || "").trim().toLowerCase();
  const filtered = search
    ? products.filter((product) =>
        `${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(search)
      )
    : products;

  res.status(200).json({
    count: filtered.length,
    data: filtered
  });
}

function getProductById(req, res) {
  const product = products.find((item) => item.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json({ data: product });
}

module.exports = { getAllProducts, getProductById };