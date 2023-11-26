export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(URL);
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId: any, query: any) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const data = await response.json();
  console.log(data);

  return data;
}

export async function getProductById(productId: string) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?items/${productId}`);
  const product = await response.json();
  return product;
}