import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Index';
import ShoppingBasket from './components/shopping basket/ShoppingBasket';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/ShoppingBasket" element={ <ShoppingBasket /> } />
    </Routes>
  );
}

export default App;
