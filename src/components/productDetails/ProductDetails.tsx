import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { getProductById } from '../../services/api';
import Header from '../header/Header';
import style from './productDetails.module.css';

type Product = {
  id: string;
  site_id: string;
  title: string;
  seller_id: number;
  category_id: string;
  price: number;
  currency_id: string;
  thumbnail: string;
};

function ProductDetails() {
  const { idApi } = useParams<{ idApi: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<any>([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (idApi) {
          const details = await getProductById(idApi);
          setProduct(details);
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [idApi]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  const handleAddToCart = (elment: any) => {
    const addTocart = cart.find((item: any) => item.id === elment.id);
    if (addTocart) {
      const verifyCart = cart.map((item: any) => (item.id === elment.id
        ? { ...item, quantity: item.quantity + 1 } : item));
      setCart(verifyCart);
      localStorage.setItem('cart', JSON.stringify(verifyCart));
    } else {
      const newCart = [...cart, { ...elment, quantity: 1 }];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  return (
    <div className={ style.main }>
      <Header />
      <section className={ style.section }>
        <h1
          className={ style.title }
          data-testid="product-detail-name"
        >
          { product.title }
        </h1>
        <img
          className={ style.productImage }
          src={ product.thumbnail }
          alt={ product.title }
          data-testid="product-detail-image"
        />
        <h3 className={ style.price }>
          {' '}
          R$
          {' '}
          {product.price.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
          })}
        </h3>
        <div className={ style.buttons }>
          <button
            type="button"
            className={ style.btn }
          >
            <Link data-testid="shopping-cart-button" to="/ShoppingBasket">
              <FirstPageIcon
                className={ style.icon }
                sx={ { fontSize: 50 } }
              />
            </Link>
          </button>
          <button
            onClick={ () => handleAddToCart(product) }
            type="button"
            data-testid="product-detail-add-to-cart"
            className={ style.btn }
          >
            <AddShoppingCartIcon
              className={ style.icon }
              sx={ { fontSize: 50 } }
            />
          </button>
          <button
            type="button"
            className={ style.btn }
          >
            <Link data-testid="shopping-cart-button" to="/ShoppingBasket">
              <ShoppingCartIcon
                className={ style.icon }
                sx={ { fontSize: 50 } }
              />
            </Link>
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
