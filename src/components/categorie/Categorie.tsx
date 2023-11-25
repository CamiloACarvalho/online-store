import { useState, useEffect } from 'react';
import { getCategories } from '../../services/api';

function Categorie() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result);
      } catch (error) {
        console.error('Erro ao carregar a API', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section>
      <h2> Categorias </h2>
      <ul>
        {categories.map((category:any, index) => (
          <li
            key={ index }
          >
            <label htmlFor={ `category${index}` }>
              <input
                id={ `category${index}` }
                data-testid="category"
                type="radio"
                value={ category }
              />
              { category.name }
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Categorie;
