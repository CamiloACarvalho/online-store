import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import style from './category.module.css';
import { getCategories } from '../../services/api';

function Category() {
  const [categories, setCategories] = useState([]);
  const [findProductsByCategory, setfindProductsByCategory] = useState([]);
  const [cart, setCart] = useState<any>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result);
      } catch (error) {
        console.error('Erro ao obter categorias:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = async (categoryID: string) => {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryID}`);
    const data = await response.json();
    setfindProductsByCategory(data.results);
  };

  const handleAddToCart = (product: any) => {
    const addTocart = cart.find((item: any) => item.id === product.id);
    if (addTocart) {
      const verifyCart = cart.map((item: any) => (item.id === product.id
        ? { ...item, quantity: item.quantity + 1 } : item));
      setCart(verifyCart);
      localStorage.setItem('cart', JSON.stringify(verifyCart));
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  return (
    <>
      <section className={ style.container }>
        <h1 className={ style.title }> Categorias </h1>
        <ul>
          {categories.map((category:any, index) => (
            <li
              className={ style.list }
              key={ index }
            >
              <label htmlFor={ `category${index}` }>
                <input
                  id={ `category${index}` }
                  data-testid="category"
                  type="radio"
                  name="selected"
                  value={ category }
                  onClick={ () => handleCategorySelect(category.id) }
                />
                { category.name }
              </label>
            </li>
          ))}
        </ul>
      </section>
      {findProductsByCategory.map((element: any) => (
        <div key={ element.id } className={ style.card }>
          <h2 data-testid="product">{element.title}</h2>
          <img src={ element.thumbnail } alt={ element.title } />
          <h3>
            {' '}
            R$
            {' '}
            {element.price.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}
          </h3>
          <button
            onClick={ () => handleAddToCart(element) }
            type="button"
            data-testid="product-add-to-cart"
          >
            Adicionar ao Carrinho
          </button>
          <Link
            data-testid="product-detail-link"
            to={ `/ProductDetails/${element.id}` }
          >
            Detalhes do produto
          </Link>
        </div>
      ))}
    </>
  );
}

export default Category;
