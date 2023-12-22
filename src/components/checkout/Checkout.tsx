import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';

type Product = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  quantity?: number;
  shipping: {
    free_shipping: boolean;
  };
};

type CheckoutForm = {
  phone: string;
  cep: string;
  address: string;
  payment: string;
  fullname: string;
  email: string;
  cpf: string;
};

const paymentOptions = [
  { method: 'Boleto', id: 'ticket-payment' },
  { method: 'Visa', id: 'visa-payment' },
  { method: 'MasterCard', id: 'master-payment' },
  { method: 'Elo', id: 'elo-payment' },
];

function Checkout() {
  const [campos, setCampos] = useState<CheckoutForm>({
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
  });

  const [cart, setCart] = useState<Product[]>([]);
  const [errorVisible, setErrorVisible] = useState(false);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCampos((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const camposInvalidos = Object.values(campos).some((value) => !value);
    if (camposInvalidos) {
      setErrorVisible(true);
    } else {
      setErrorVisible(false);
      // Limpar o carrinho ao finalizar a compra
      localStorage.removeItem('cart');
      setCart([]);
    }
  };

  return (
    <>
      <Header />
      <section>
        <h1>Revise seus produtos</h1>
        {cart.map(({ title, thumbnail, price, id, quantity }) => (
          <div key={ id }>
            <img src={ thumbnail } alt={ title } />
            <span>{title}</span>
            <span>{price}</span>
            <span>{quantity}</span>
          </div>
        ))}
      </section>
      <form onSubmit={ handleSubmit }>
        {Object.entries(campos).map(([fieldName, fieldValue]) => (
          <div key={ fieldName }>
            <label htmlFor={ fieldName }>
              {fieldName}
              :
            </label>
            <input
              name={ fieldName }
              type={ fieldName === 'email' ? 'email' : 'text' }
              id={ fieldName }
              data-testid={ `checkout-${fieldName.toLowerCase()}` }
              value={ fieldValue }
              onChange={ handleChange }
            />
          </div>
        ))}
        <div>
          <h3>Método de pagamento:</h3>
          {paymentOptions.map(({ method, id }) => (
            <div key={ id }>
              <input
                type="radio"
                id={ method.toLowerCase() }
                name="payment"
                data-testid={ id }
                value={ method }
                checked={ campos.payment === method }
                onChange={ handleChange }
              />
              <label htmlFor={ method.toLowerCase() }>{method}</label>
            </div>
          ))}
        </div>
        {errorVisible && <div data-testid="error-msg">Campos inválidos</div>}
        <button type="submit" data-testid="checkout-btn">
          Enviar
        </button>
        <Link to="/ShoppingBasket">
          <button>Cancelar</button>
        </Link>
      </form>
    </>
  );
}

export default Checkout;
