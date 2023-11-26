import { useState, useEffect } from 'react';
import { getCategories } from '../../services/api';

interface CategorieProps {
  onSelectCategory: (category: string) => void;
}

function Categorie({ onSelectCategory }: CategorieProps) {
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

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value;
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
                value={ category }
                onChange={ handleSelect }
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
