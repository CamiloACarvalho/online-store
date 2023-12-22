import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../services/api';
import Header from '../header/Header';

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
    <div>
      <Header />
      <h1 data-testid="product-detail-name">{ product.title }</h1>
      <img
        src={ product.thumbnail }
        alt={ product.title }
        data-testid="product-detail-image"
      />
      <p data-testid="product-detail-price">
        {product.price}
      </p>
      <button
        onClick={ () => handleAddToCart(product) }
        type="button"
        data-testid="product-detail-add-to-cart"
      >
        Adicionar ao Carrinho
      </button>
      <Link data-testid="shopping-cart-button" to="/ShoppingBasket">
        Ir para carrinho de compras
      </Link>
    </div>
  );
}

export default ProductDetails;
