import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../../services/api';

function Home() {
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const getValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = event.target.value;
    setSearch(valueInput);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result);
      } catch (error) {
        console.error('Erro ao carregar a API', error);
      }
    };

    fetchCategories();
  }, []);

  const getProducts = async () => {
    try {
      const resultAPI = await getProductsFromCategoryAndQuery(categoryId, search);
      if (resultAPI && resultAPI.results) {
        setProducts(resultAPI.results);
        setCategoryId(resultAPI.id);
      } else {
        console.error('A resposta da API não contém os resultados esperados.', resultAPI);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos', error);
    }
  };

  return (
    <>
      <div>
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        {search === '' && (
          <input
            data-testid="query-input"
            type="text"
            value={ search }
            onChange={ getValueInput }
          />
        )}
      </div>
      <button
        data-testid="query-button"
        type="button"
        onClick={ getProducts }
      >
        Buscar
      </button>
      <Link
        data-testid="shopping-cart-button"
        to="/ShoppingBasket"
      >
        Ir para carrinho de compras
      </Link>
      <aside>
        <section>
          <h2> Categorias </h2>
          <ul>
            {categories.map((category:any, index) => (
              <li
                key={ index }
              >
                <label htmlFor={ `category${index}` }>
                  <input
                    id={ `category${index}` }
                    data-testid="category"
                    type="radio"
                  />
                  { category.name }
                </label>
              </li>
            ))}
          </ul>
        </section>
      </aside>
      <section>
        <ul>
          {products.length > 0 ? (
            products.map((product: any, index) => (
              <li data-testid="product" key={ index }>
                {product.title}
                <img src={ product.thumbnail } alt={ product.title } />
                {product.results.price}
              </li>
            ))
          ) : (
            <p>Nenhum produto foi encontrado</p>
          )}
        </ul>
      </section>
    </>
  );
}

export default Home;
