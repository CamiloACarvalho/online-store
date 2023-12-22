import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Category from '../category/Category';
import { getProductsFromCategoryAndQuery } from '../../services/api';
import Header from '../header/Header';
import style from './index.module.css';

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
    <div className={ style.main }>
      <Header />
      <div>
        <div className={ style.search }>
          <input
            className={ style.input }
            data-testid="query-input"
            type="text"
            value={ search }
            onChange={ getValueInput }
            placeholder="Insira o nome do produto"
          />
          <button
            type="button"
            onClick={ handleClick }
            data-testid="query-button"
            className={ style.buttonSearch }
          >
            Buscar
          </button>
        </div>
        <div className={ style.containerProducts }>
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
                <img
                  className={ style.addCart }
                  src="../public/AddCart.png"
                  alt="shopping cart"
                />
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
      </div>
      <div className={ style.containerCategories }>
        <Category />
      </div>
    </div>
  );
}

export default Home;
