import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/api';

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
  const [addedToCart, setAddedToCart] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

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

  const addToCart = () => {
    setAddedToCart(true);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div>
      <h1 data-testid="product-detail-name">{ product.title }</h1>
      <img
        src={ product.thumbnail }
        alt={ product.title }
        data-testid="product-detail-image"
      />
      <p>
        {' '}
        R$
        {' '}
        {product.price.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}
      </p>
      <button onClick={ addToCart } data-testid="shopping-cart-button">
        Adicionar ao Carrinho
      </button>
      {addedToCart && (
        <p data-testid="shopping-cart-empty-message">
          Produto adicionado ao carrinho!
        </p>
      )}
    </div>
  );
}

export default ProductDetails;
