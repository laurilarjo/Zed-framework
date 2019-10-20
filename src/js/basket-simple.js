function adjustCart(index, increment) {
  Z.basket.products[index].quantity += increment;
  if (!Z.basket.products[index].quantity) {
    Z.basket.products.splice(index, 1);
  }
  Z.basket.update();
}

document.getElementById("output-basket").outerHTML = Z.basket.products.length
  ? Z.basket.products
      .map(function(product, index) {
        return `
    <div>
        <span>${
          product.name
        }</span> <span><button onclick="adjustCart(${index}, -1)">-</button> <span>${product.quantity}</span> <button onclick="adjustCart(${index}, 1)">+</button></span> <span>${(product.price * product.quantity).toFixed(2)}</span>
    </div>
    `;
      })
      .join("") +
    `
    <div>
        <span>Total: ${Z.basket.total.toFixed(2)}</span>
    </div>`
  : "";
