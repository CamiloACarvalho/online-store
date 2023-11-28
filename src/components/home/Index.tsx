import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Category from '../category/Category';
import { getProductsFromCategoryAndQuery } from '../../services/api';

function Home() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState<any>([]);

  const handleAddToCart = (product: any) => {
    const addTocart = cart.find((item: any) => item.id === product.id);
    if (addTocart) {
      const verifyCart = cart.map((item: any) => (item.id === product.id
        ? { ...item, quantity: item.quantity + 1 } : item));
      setCart(verifyCart);
      localStorage.setItem('cart', JSON.stringify(verifyCart));
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const getValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = event.target.value;
    setSearch(valueInput);
  };

  const handleClick = async () => {
    const response = await getProductsFromCategoryAndQuery('', search);
    setProducts(response.results);
    setSearch('');
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
        <button type="button" onClick={ handleClick } data-testid="query-button">
          Buscar
        </button>
        {search === '' && (
          <h2 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
        )}
        {products.map((product: any) => (
          <div key={ product.id }>
            <h2 data-testid="product">{product.title}</h2>
            <img src={ product.thumbnail } alt={ product.title } />
            <h3>
              {' '}
              R$
              {' '}
              {product.price.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}
            </h3>
            <button
              onClick={ () => handleAddToCart(product) }
              type="button"
              data-testid="product-add-to-cart"
            >
              Adicionar ao Carrinho
            </button>
            <Link
              data-testid="product-detail-link"
              to={ `/ProductDetails/${product.id}` }
            >
              Detalhes do produto
            </Link>
          </div>
        ))}
      </div>
      <Link data-testid="shopping-cart-button" to="/ShoppingBasket">
        <button> Ir para carrinho de compras</button>
      </Link>
      <Category />
    </>
  );
}

export default Home;
