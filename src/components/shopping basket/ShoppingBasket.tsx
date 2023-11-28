import { useEffect, useState } from 'react';

function ShoppingBasket() {
  const [cart, setCart] = useState([]);
  const [removeItem, setRemoveItem] = useState();

  useEffect(() => {
    const getCart = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log(getCart);
    setCart(getCart);
  }, []);
  console.log(cart);

  const handleRemove = (productId) => {
    const updatedCart = cart.filter(product => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      {cart.length === 0 ? (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      ) : (
        cart.map((product: any) => (
          <div key={ product.id }>
            <h2 data-testid="shopping-cart-product-name">{product.title}</h2>
            <p data-testid="shopping-cart-product-quantity">
              {product.quantity}
            </p>
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
              type="reset"
              data-testid="remove-product"
              onClick={ () => handleRemove(product.id) }
            >
              Remover Item
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ShoppingBasket;
