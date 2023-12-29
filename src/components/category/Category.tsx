import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import style from './category.module.css';
import { getCategories } from '../../services/api';
import 'bootstrap/dist/css/bootstrap.css';

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
    <div className={ style.main }>
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
      <section className={ style.section }>
        <Carousel
          className={ style.containerProducts }
        >
          {findProductsByCategory.map((element: any) => (
            <Carousel.Item>
              <div 
                className={ style.card }
                key={ element.id }
              >
                <h2
                  className={ style.description }
                  data-testid="product">{element.title}
                </h2>
                <img
                  className={ style.image }
                  src={ element.thumbnail }
                  alt={ element.title } 
                />
                <h3 className={ style.price }>
                  {' '}
                  R$
                  {' '}
                  {element.price.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}
                </h3>
                <div className={ style.btnCard }></div>
                  <button
                    onClick={ () => handleAddToCart(element) }
                    type="button"
                    data-testid="product-add-to-cart"
                  >
                    Adicionar ao Carrinho
                  </button>
                  <button
                    type="button"
                    data-testid="product-detail-link"
                    className={ style.btn }
                  >
                    <Link to={ `/ProductDetails/${element.id}` }>
                      <InfoIcon
                        className={ style.icon }
                        sx={ { fontSize: 50 } }
                      />
                    </Link>
                  </button>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
    </div>
  );
}

export default Category;
