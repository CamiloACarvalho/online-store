import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Product = {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
};

function ShoppingBasket() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const getCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(getCart);
  }, []);

  const handleRemove = (productId: Product) => {
    const updatedCart = cart.filter((element: any) => element.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleIncrease = (productId: string) => {
    const addItem = cart.map((item: any) => (item.id === productId ? { ...item,
      quantity:
       item.quantity + 1 } : item));
    setCart(addItem);
    localStorage.setItem('cart', JSON.stringify(addItem));
  };

  const handleDecrease = (productId: Product) => {
    const removeItem = cart.map((item: any) => (item.id === productId && item.quantity > 1
      ? { ...item, quantity: item.quantity - 1 }
      : item));
    setCart(removeItem);
    localStorage.setItem('cart', JSON.stringify(removeItem));
  };

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      {cart.length === 0 ? (
        <div>
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          <Link to="/">
            <button>Buscar produtos</button>
          </Link>
        </div>
      ) : (
        <>
          {cart.map((product: any) => (
            <div key={ product.id }>
              <h2 data-testid="shopping-cart-product-name">{product.title}</h2>
              <p data-testid="shopping-cart-product-quantity">
                <button
                  data-testid="product-decrease-quantity"
                  onClick={ () => handleDecrease(product.id) }
                >
                  ➖
                </button>
                {product.quantity}
                <button
                  data-testid="product-increase-quantity"
                  onClick={ () => handleIncrease(product.id) }
                >
                  ➕
                </button>
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
          ))}
          <Link to="/">
            <button>Buscar produtos</button>
          </Link>
          <Link data-testid="checkout-products" to="/checkout">
            <button>Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default ShoppingBasket;
