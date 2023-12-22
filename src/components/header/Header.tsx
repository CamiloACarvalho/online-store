import { Link } from 'react-router-dom';
import PaymentIcon from '@mui/icons-material/Payment';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import style from './header.module.css';

function Header() {
  return (
    <header className={ style.header }>
      <h1 className={ style.title }>MILO STORE</h1>
      <div className={ style.icon }>
        <Link to="/">
          <StoreIcon
            color="disabled"
            sx={ { fontSize: 50 } }
          />
        </Link>
        <Link data-testid="shopping-cart-button" to="/ShoppingBasket">
          <ShoppingCartIcon
            color="disabled"
            sx={ { fontSize: 50 } }
          />
        </Link>
        <Link to="/Checkout">
          <PaymentIcon
            color="disabled"
            sx={ { fontSize: 50 } }
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
