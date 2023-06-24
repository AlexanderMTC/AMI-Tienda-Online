const productContainer = document.querySelector(".card-products-container"),
  productos = [];

const shopContent = document.getElementById("shopContent");
const cart = [];

let ApiURL = "https://api.escuelajs.co/api/v1/products?offset=0&limit=10";

async function requestProducts(ApiURL) {
  console.log(ApiURL);
  await fetch(ApiURL)
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
requestProducts(ApiURL);

const loadProducts = () => {
  productos.forEach((product) => {
    const content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.productName}</h3>
    <p class="price">${product.price} $</p>
    `;

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
    shopContent.append(content);
  });
};
