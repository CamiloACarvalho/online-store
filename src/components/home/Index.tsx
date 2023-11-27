import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Category from '../categories/Category';
import { getProductsFromCategoryAndQuery } from '../../services/api';

function Home() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);

  const getValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = event.target.value;
    setSearch(valueInput);
  };

  const handleClick = async () => {
    const response = await getProductsFromCategoryAndQuery(selectedCategory, search);
    setProducts(response.results);
    setSearch('');
  };

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    const response = await getProductsFromCategoryAndQuery(category, '');
    setProducts(response.results);
  };

  return (
    <>
      <div>
        <input
          data-testid="query-input"
          type="text"
          value={ search }
          onChange={ getValueInput }
        />
        <button
          type="button"
          onClick={ handleClick }
          data-testid="query-button"
        >
          Buscar
        </button>
        {search === '' && (
          <h2 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
        )}
        {products.map((product: any) => (
          <div key={ product.id }>
            <h2 data-testid="product">
              {product.title}
            </h2>
            <img src={ product.thumbnail } alt={ product.title } />
            <h3>
              {' '}
              R$
              {' '}
              {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
          </div>
        ))}
      </div>
      <Link
        data-testid="shopping-cart-button"
        to="/ShoppingBasket"
      >
        Ir para carrinho de compras
      </Link>
      <Category onSelectCategory={ handleCategorySelect } />
    </>
  );
}

export default Home;
