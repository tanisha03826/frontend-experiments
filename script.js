function loadExp(exp) {
  const content = document.getElementById("content");

  /* ================= EXPERIMENT 1 ================= */
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

  /* ================= EXPERIMENT 2 ================= */
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

    function showProducts(category) {
      grid.innerHTML = "";
      products
        .filter(p => category === "All" || p.category === category)
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

    filter.addEventListener("change", () => showProducts(filter.value));
    showProducts("All");
  }

  /* ================= EXPERIMENT 3 ================= */
  if (exp === "exp3") {
    content.innerHTML = `
      <h2>Interactive SVG Drawing Tool</h2>

      <label>Select Color:</label>
      <input type="color" id="colorPicker" value="#000000">
      <button id="undoBtn">Undo</button>

      <svg id="svgCanvas" viewBox="0 0 100 60"></svg>
    `;

    const svg = document.getElementById("svgCanvas");
    const colorPicker = document.getElementById("colorPicker");
    const undoBtn = document.getElementById("undoBtn");

    let drawing = false;
    let currentPath = null;

    svg.addEventListener("mousedown", (e) => {
      drawing = true;

      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;

      const cursor = pt.matrixTransform(svg.getScreenCTM().inverse());

      currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      currentPath.setAttribute("stroke", colorPicker.value);
      currentPath.setAttribute("fill", "none");
      currentPath.setAttribute("stroke-width", "0.5");
      currentPath.setAttribute("d", `M ${cursor.x} ${cursor.y}`);

      svg.appendChild(currentPath);
    });

    svg.addEventListener("mousemove", (e) => {
      if (!drawing) return;

      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;

      const cursor = pt.matrixTransform(svg.getScreenCTM().inverse());
      const d = currentPath.getAttribute("d");

      currentPath.setAttribute("d", d + ` L ${cursor.x} ${cursor.y}`);
    });

    svg.addEventListener("mouseup", () => {
      drawing = false;
    });

    undoBtn.addEventListener("click", () => {
      if (svg.lastChild) {
        svg.removeChild(svg.lastChild);
      }
    });
  }
}

/* Load first experiment by default */
loadExp("exp1");



