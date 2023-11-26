import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/api';

function ProductDetails() {
  const { idApi } = useParams<{ idApi: string }>();
  const [addedToCart, setAddedToCart] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const allProductDetails = async () => {
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

  const addToCart = () => {
    setAddedToCart(true);
  };

  allProductDetails();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1 data-testid="product-detail-name">{product.title}</h1>
      <img
        src={product.picture}
        alt={product.title}
        data-testid="product-detail-image"
      />
      <p data-testid="product-detail-price">{product.price}</p>
      <button onClick={addToCart} data-testid="shopping-cart-button">
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