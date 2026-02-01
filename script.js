function loadExp(exp) {
  const content = document.getElementById("content");

  if (exp === "exp1") {
    content.innerHTML = `
      <h2>Live Character Counter</h2>

      <textarea id="textInput" maxlength="200" placeholder="Type here..."></textarea>
      <p id="counter">0 / 200 characters</p>
    `;

    const input = document.getElementById("textInput");
    const counter = document.getElementById("counter");

    input.addEventListener("input", () => {
      const len = input.value.length;
      counter.textContent = len + " / 200 characters";
      counter.className = len === 200 ? "limit" : "";
    });
  }

  if (exp === "exp2") {
    content.innerHTML = `
      <h2>Dynamic Product Filter</h2>

      <select id="filter">
        <option value="All">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
      </select>

      <div class="grid" id="grid"></div>
    `;

    const products = [
      { name: "Laptop", category: "Electronics", price: 55000 },
      { name: "Headphones", category: "Electronics", price: 2999 },
      { name: "T-Shirt", category: "Clothing", price: 799 },
      { name: "Jeans", category: "Clothing", price: 1999 }
    ];

    const grid = document.getElementById("grid");
    const filter = document.getElementById("filter");

    function show(cat) {
      grid.innerHTML = "";
      products
        .filter(p => cat === "All" || p.category === cat)
        .forEach(p => {
          grid.innerHTML += `
            <div class="card">
              <h4>${p.name}</h4>
              <p>₹ ${p.price.toFixed(2)}</p>
              <small>${p.category}</small>
            </div>
          `;
        });
    }

    filter.addEventListener("change", () => show(filter.value));
    show("All");
  }
}


