# Express.js Product Details

A small Express.js product catalog that reads seed data from `data/products.json`, serves a browser-based index page, and exposes a JSON API. It includes controller and route folders, automated tests, ESLint, and GitHub Actions CI.

## Requirements
- Node.js 20+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/api/products` | List all seeded products |
| GET | `/api/products?search=keyboard` | Search by name, category or description |
| GET | `/api/products/:id` | Get one product by ID |

## Project structure

```text
expressjs-product-details/
├── .github/workflows/ci.yml
├── data/products.json
├── public/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── src/
│   ├── app.js
│   ├── controllers/productController.js
│   └── routes/productRoutes.js
├── test/products.test.js
├── .gitignore
├── eslint.config.js
├── package.json
└── server.js
```

## Run quality checks

```bash
npm test
npm run lint
```

GitHub Actions runs install, lint and tests on pushes and pull requests targeting `main` or `master`.

## Publish to GitHub

```bash
git init
git add .
git commit -m "Initial Express product catalog"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/expressjs-product-details.git
git push -u origin main
```

For reproducible installs, run `npm install` locally and commit the generated `package-lock.json`. The workflow currently uses `npm install` so it also works before a lockfile is committed.
