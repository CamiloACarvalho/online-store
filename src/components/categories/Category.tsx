import { useState, useEffect } from 'react';
import { getCategories } from '../../services/api';

interface CategoryProps {
  onSelectCategory: (category: string) => void;
}

function Category({ onSelectCategory }: CategoryProps) {
  const [categories, setCategories] = useState([]);

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

  const handleSelect = (category: string) => {
    onSelectCategory(category);
  };

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
                name="selected"
                value={ category }
                onClick={ () => handleSelect(category.name) }
              />
              { category.name }
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Category;
