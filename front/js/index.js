async function getProducts() {
  const data = await fetch('http://localhost:3000/api/products');
  const products = await data.json();
  return products;

}
const products = await getProducts();

const container = document.querySelector('.items') // document.querySelector('#items')

products.forEach((product, index) => {
  container.innerHTML += `<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>

  </a>`
})

