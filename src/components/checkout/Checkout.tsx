import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './checkout.module.css';
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
  { method: 'Pix', id: 'ticket-payment' },
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
      localStorage.removeItem('cart');
      setCart([]);
    }
  };

  return (
    <>
      <Header />
      <main className={ style.main }>
        <h1 className={ style.title }>Revise seus produtos</h1>
        <section className={ style.review }>
          {cart.map(({ title, thumbnail, price, id, quantity }) => (
            <div
              className={ style.containerProducts }
              key={ id }
            >
              <img
                className={ style.img }
                src={ thumbnail }
                alt={ title }
              />
              <span className={ style.name }>
                {title}
              </span>
              <table className={ style.table }>
                <thead>
                  <tr className={ style.head }>
                    <th className={ style.columnTitle }>Valor unitáro</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={ style.body }>
                    <td className={ style.price }>
                      R$
                      {price}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className={ style.table }>
                <thead>
                  <tr className={ style.head }>
                    <th className={ style.columnTitle }>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={ style.body }>
                    <td className={ style.quantity }>
                      {quantity}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className={ style.table }>
                <thead>
                  <tr className={ style.head }>
                    <th className={ style.columnTitle }>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={ style.body }>
                    <td className={ style.total }>
                      R$
                      { price * (quantity ?? 0) }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </section>
        <form
          className={ style.form }
          onSubmit={ handleSubmit }
        >
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
          <div className={ style.payment }>
            <h3 className={ style.method }>
              Método de pagamento:
            </h3>
            {paymentOptions.map(({ method, id }) => (
              <div key={ id }>
                <input
                  className={ style.input }
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
          <div className={ style.btnGroup }>
            <button
              className={ style.btnSend }
              type="submit"
              data-testid="checkout-btn"
            >
              Enviar
            </button>
            <Link to="/ShoppingBasket">
              <button className={ style.btnCancel }>
                Cancelar
              </button>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}

export default Checkout;
