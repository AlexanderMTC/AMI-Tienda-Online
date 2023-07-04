const input = document.querySelector(".header_search");
const image = document.querySelector(".header__search-img");

input.addEventListener("search", () => {
  shopContent.innerHTML = "";
  productos.length = 0;
  searchProducts(input.value);
  input.value = "";
  header.classList.remove("mostrar");
  if (header.classList.contains("mostrar")) {
    menuHambImg.setAttribute("src", "/client/assets/close.svg");
  } else {
    menuHambImg.setAttribute("src", "/client/assets/menu.svg");
  }
});

image.addEventListener("click", () => {
  shopContent.innerHTML = "";
  productos.length = 0;
  searchProducts(input.value);
  input.value = "";
  header.classList.remove("mostrar");
  if (header.classList.contains("mostrar")) {
    menuHambImg.setAttribute("src", "/client/assets/close.svg");
  } else {
    menuHambImg.setAttribute("src", "/client/assets/menu.svg");
  }
});

function searchProducts(pSearch) {
  ApiURL = `https://api.escuelajs.co/api/v1/products/?title=${pSearch}`;
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

        loadProducts(productos);
      })
      .catch((err) => {
        console.log(err);
        let message = err.statusText || "Ocurrio un error...";
        productContainer.innerHTML = `Error ${err.status}: ${message}`;
      });
  }
  requestProducts(ApiURL);

  const loadProducts = (p) => {
    p.forEach((product) => {
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
}
