import React, { useState } from 'react';

function Home() {
  const [search, setSearch] = useState('');

  const getValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = event.target.value;
    setSearch(valueInput);
  };

  return (
    <div>
      <input type="text" value={ search } onChange={ getValueInput } />
      {search === '' && (
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
      )}
    </div>
  );
}

export default Home;
