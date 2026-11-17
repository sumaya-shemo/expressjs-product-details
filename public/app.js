const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const dialog = document.getElementById("productDialog");
const productDetails = document.getElementById("productDetails");
const closeDialog = document.getElementById("closeDialog");

const icons = {
  Electronics: "🎧",
  Accessories: "🎒",
  Home: "💡",
  MicroPhone:"🎙️"
};

function money(product) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency || "USD"
  }).format(product.price);
}

function renderProducts(products) {
  resultCount.textContent = `${products.length} product${products.length === 1 ? "" : "s"} found`;
  if (!products.length) {
    productGrid.innerHTML = '<p class="empty">No products found. Try another search.</p>';
    return;
  }

  productGrid.innerHTML = products.map((product) => `
    <article class="product-card">
      <div class="product-art" aria-hidden="true">${icons[product.category] || "📦"}</div>
      <div class="product-info">
        <span class="category">${product.category}</span>
        <h3>${escapeHtml(product.name)}</h3>
        <p class="description">${escapeHtml(product.description)}</p>
        <div class="card-bottom">
          <span class="price">${money(product)}</span>
          <button class="details-btn" data-id="${product.id}">View details</button>
        </div>
      </div>
    </article>
  `).join("");

  productGrid.querySelectorAll(".details-btn").forEach((button) => {
    button.addEventListener("click", () => showDetails(button.dataset.id));
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

async function loadProducts(search = "") {
  try {
    const url = new URL("/api/products", window.location.origin);
    if (search) url.searchParams.set("search", search);
    const response = await fetch(url);
    if (!response.ok) throw new Error("Could not load products");
    const result = await response.json();
    renderProducts(result.data);
  } catch  {
    productGrid.innerHTML = '<p class="error">Unable to load products. Please refresh the page.</p>';
    resultCount.textContent = "Connection error";
  }
}

async function showDetails(id) {
  try {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) throw new Error("Product not found");
    const { data: product } = await response.json();
    productDetails.innerHTML = `
      <div class="detail-art">${icons[product.category] || "📦"}</div>
      <span class="category">${escapeHtml(product.category)}</span>
      <h2>${escapeHtml(product.name)}</h2>
      <p>${escapeHtml(product.description)}</p>
      <p class="detail-meta">Price: <strong>${money(product)}</strong><br>
      Stock: ${product.stock > 0 ? `${product.stock} available` : "Out of stock"}<br>
      Rating: ★ ${product.rating} / 5<br>Product ID: #${product.id}</p>
    `;
    dialog.showModal();
  } catch {
    productDetails.textContent = "Unable to load product details.";
    dialog.showModal();
  }
}

let searchTimer;
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => loadProducts(searchInput.value.trim()), 250);
});
closeDialog.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

loadProducts();