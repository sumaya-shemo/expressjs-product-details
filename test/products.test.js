const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../src/app");

test("GET /health returns ok", async () => {
  const response = await request(app).get("/health");
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: "ok" });
});

test("GET /api/products returns seeded products", async () => {
  const response = await request(app).get("/api/products");
  assert.equal(response.status, 200);
  assert.ok(response.body.count >= 1);
  assert.ok(Array.isArray(response.body.data));
  assert.equal(response.body.data[0].name, "Wireless Headphones");
});

test("GET /api/products supports search", async () => {
  const response = await request(app).get("/api/products?search=keyboard");
  assert.equal(response.status, 200);
  assert.equal(response.body.count, 1);
  assert.equal(response.body.data[0].name, "Mechanical Keyboard");
});

test("GET /api/products/:id returns one product", async () => {
  const response = await request(app).get("/api/products/2");
  assert.equal(response.status, 200);
  assert.equal(response.body.data.name, "Smart Watch");
});

test("GET /api/products/:id returns 404 for unknown product", async () => {
  const response = await request(app).get("/api/products/999");
  assert.equal(response.status, 404);
  assert.equal(response.body.message, "Product not found");
});