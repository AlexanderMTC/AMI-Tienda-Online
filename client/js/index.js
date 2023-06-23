const productContainer = document.querySelector("card-products-container"),
  productos = [];

const shopContent = document.getElementById("shopContent");
const cart = [];

async function requestProducts() {
  await fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=10")
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      json.forEach((el) => {
        productos.push({
          id: el.id,
          productName: el.title,
          price: el.price,
          quanty: 1,
          img: el.images[0],
        });
      });
      loadProducts();
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "Ocurrio un error...";
      productContainer.innerHTML = `Error ${err.status}: ${message}`;
    });
}
requestProducts();

const loadProducts = () => {
  productos.forEach((product) => {
    const content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
  <img src="${product.img}">
  <h3>${product.productName}</h3>
  <p class="price">${product.price} $</p>
  `;
    shopContent.append(content);

    const buyButton = document.createElement("button");
    buyButton.innerText = "Buy";

    content.append(buyButton);
    buyButton.addEventListener("click", () => {
      const repeat = cart.some(
        (repeatProduct) => repeatProduct.id === product.id
      );

      if (repeat) {
        cart.map((prod) => {
          if (prod.id === product.id) {
            prod.quanty++;
            displayCartCounter();
          }
        });
      } else {
        cart.push({
          id: product.id,
          productName: product.productName,
          price: product.price,
          quanty: product.quanty,
          img: product.img,
        });
        displayCartCounter();
      }
    });
  });
};
