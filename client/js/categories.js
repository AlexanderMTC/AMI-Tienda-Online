const categories = [];

async function requestCategories() {
  await fetch("https://api.escuelajs.co/api/v1/categories")
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      json.forEach((el) => {
        categories.push({
          id: el.id,
          name: el.name,
          img: el.image,
        });
      });
      loadCategories();
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "Ocurrio un error...";
      productContainer.innerHTML = `Error ${err.status}: ${message}`;
    });
}
requestCategories();

const content = document.querySelector(".category__list");

const loadCategories = () => {
  categories.forEach((categori) => {
    content.innerHTML += `
  <li class="category__links"><a id="${categori.id}" onclick=loadProdXcat(${categori.id}) href="#" class="category__link">${categori.name}</a></li>
  `;
  });
};

function loadProdXcat(cat) {
  shopContent.innerHTML = "";
  ApiURL = `https://api.escuelajs.co/api/v1/products/?categoryId=${cat}`;
  requestProducts(ApiURL);
}
