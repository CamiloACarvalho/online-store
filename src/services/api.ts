export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId: string, query: string) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const urlQuer = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const urlCat = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const response = await fetch(urlQuer);
  const result = await fetch(urlCat);
  const data = await response.json();
  const dados = await result.json();
  return data && dados;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
