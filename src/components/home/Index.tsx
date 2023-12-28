import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import Carousel from 'react-bootstrap/Carousel';
import Category from '../category/Category';
import { getProductsFromCategoryAndQuery } from '../../services/api';
import Header from '../header/Header';
import style from './index.module.css';
import 'bootstrap/dist/css/bootstrap.css';

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
            <SearchIcon
              style={ { marginLeft: '15px' } }
            />
          </button>
        </div>
        <div
          className={ style.containerProducts }
        >
          {products.map((product: any) => (
            <div
              className={ style.card }
              key={ product.id }
            >
              <h2
                className={ style.description }
                data-testid="product"
              >
                {product.title}
              </h2>
              <img
                className={ style.image }
                src={ product.thumbnail }
                alt={ product.title }
              />
              <h3 className={ style.price }>
                {' '}
                R$
                {' '}
                {product.price.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
              </h3>
              <div className={ style.btnCard }>
                <button
                  type="button"
                  onClick={ () => handleAddToCart(product) }
                  data-testid="product-add-to-cart"
                  id="add-to-cart-button"
                  className={ style.btn }
                >
                  <AddShoppingCartIcon
                    className={ style.icon }
                    sx={ { fontSize: 50 } }
                  />
                </button>
                <button
                  type="button"
                  data-testid="product-detail-link"
                  className={ style.btn }
                >
                  <Link to={ `/ProductDetails/${product.id}` }>
                    <InfoIcon
                      className={ style.icon }
                      sx={ { fontSize: 50 } }
                    />
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Category />
    </div>
  );
}

export default Home;
