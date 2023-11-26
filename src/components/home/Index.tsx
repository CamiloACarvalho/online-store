import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Categorie from '../categorie/Categorie';
import ProductDetails from '../productDetails/productDetails';

function Home() {
  const [search, setSearch] = useState('');

  const getValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = event.target.value;
    setSearch(valueInput);
  };

  return (
    <>
      <div>
        <input type="text" value={ search } onChange={ getValueInput } />
        {search === '' && (
          <h2 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
        )}
      </div>
      <Link
        data-testId="shopping-cart-button"
        to="/ShoppingBasket"
      >
        Ir para carrinho de compras
      </Link>
      <Categorie />
    </>
  );
}

export default Home;
