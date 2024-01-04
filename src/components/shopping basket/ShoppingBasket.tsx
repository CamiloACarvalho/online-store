import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import PaymentIcon from '@mui/icons-material/Payment';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Header from '../header/Header';
import style from './shoppingBasket.module.css';

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

    // if (getCart.length === 0) {
    //   Swal.fire({
    //     imageUrl: './public/withoutItens.png',
    //     imageWidth: 200,
    //     imageHeight: 200,
    //     imageAlt: 'Shopping Cart Empty',
    //     title: 'Oops...',
    //     text: 'Seu carrinho está vazio!',
    //     showCloseButton: true,
    //     confirmButtonText: '<i class="fa fa-thumbs-up"> OK! </i>',
    //   });
    // } else {
    //   Swal.fire({
    //     imageUrl: './public/haveItens.png',
    //     imageWidth: 200,
    //     imageHeight: 200,
    //     imageAlt: 'Shopping Cart Empty',
    //     title: 'Ebaaaa...',
    //     text: 'Você possui itens no seu carrinho!',
    //     showCloseButton: true,
    //     confirmButtonText: '<i class="fa fa-thumbs-up"> OK! </i>',
    //   });
    // }
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
      <Header />
      <div className={ style.main }>
        {cart.length === 0 ? (
          <div className={ style.empatySection }>
            <h1 className={ style.titleName }>Carrinho de Compras</h1>
            <button className={ style.buttonSearch }>
              Buscar
              <SearchIcon
                style={ { fontSize: 40 } }
              />
            </button>
          </div>
        ) : (
          <div className={ style.containerProducts }>
            <h1 className={ style.titleName }>Carrinho de Compras</h1>
            {cart.map((product: any) => (
              <div
                className={ style.product }
                key={ product.id }
              >
                <h2
                  data-testid="shopping-cart-product-name"
                  className={ style.title }
                >
                  {product.title}
                </h2>
                <section className={ style.secondSection }>
                  <img
                    className={ style.img }
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
                  <section
                    className={ style.itenNumber }
                    data-testid="shopping-cart-product-quantity"
                  >
                    <button
                      className={ style.lessBtn }
                      data-testid="product-decrease-quantity"
                      onClick={ () => handleDecrease(product.id) }
                    >
                      <RemoveCircleIcon
                        className={ style.icon }
                        sx={ { fontSize: 25 } }
                      />
                    </button>
                    <h3 className={ style.quantity }>
                      {product.quantity}
                    </h3>
                    <button
                      className={ style.addBtn }
                      data-testid="product-increase-quantity"
                      onClick={ () => handleIncrease(product.id) }
                    >
                      <AddCircleIcon
                        className={ style.icon }
                        sx={ { fontSize: 25 } }
                      />
                    </button>
                  </section>
                  <button
                    className={ style.btn }
                    type="reset"
                    data-testid="remove-product"
                    onClick={ () => handleRemove(product.id) }
                  >
                    Remover Item
                    <RemoveShoppingCartIcon
                      style={ { fontSize: 30 } }
                    />
                  </button>
                </section>
              </div>
            ))}
            <div className={ style.btnPage }>
              <Link to="/">
                <button className={ style.btn }>
                  Buscar produtos
                  <SearchIcon
                    style={ { fontSize: 30 } }
                  />
                </button>
              </Link>
              <Link data-testid="checkout-products" to="/checkout">
                <button className={ style.btn }>
                  Finalizar compra
                  <PaymentIcon
                    style={ { fontSize: 30 } }
                  />
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingBasket;
