import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Index';
import ShoppingBasket from './components/shopping basket/ShoppingBasket';
import ProductDetails from './components/productDetails/ProductDetails';
import './App.css';
import Checkout from './components/checkout/Checkout';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="ShoppingBasket" element={ <ShoppingBasket /> } />
      <Route path="Checkout" element={ <Checkout /> } />
      <Route path="ProductDetails/:idApi" element={ <ProductDetails /> } />
    </Routes>
  );
}

export default App;
