import { useEffect, useState } from 'react';

function ShoppingBasket() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const getCart = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log(getCart);
    setCart(getCart);
  }, []);
  console.log(cart);

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      {cart.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        cart.map((product: any) => (
          <div key={ product.id }>

            <h2 data-testid="shopping-cart-product-name">{ product.title }</h2>
            <p data-testid="shopping-cart-product-quantity">{product.quantity}</p>
            <img src={ product.thumbnail } alt={ product.title } />
            <h3>
              {product.price}
            </h3>
          </div>

        ))
      )}
    </div>
  );
}

export default ShoppingBasket;
