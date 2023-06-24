const input = document.querySelector(".header_search");

input.addEventListener("search", () => {
  searchProducts(input.value);
});

function searchProducts(pSearch) {
  ApiURL = `https://api.escuelajs.co/api/v1/products/?title=${pSearch}`;
  requestProducts(ApiURL);
}
