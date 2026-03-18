import { useState } from 'react';

function PokemonForm({ addCard, status }) {
  const [pokemonName, setPokemonName] = useState('');

  const handleSubmit = async (event) => {
    await addCard(pokemonName, event);
    setPokemonName('');
  };

  return (
    <form className="pokemon-form" onSubmit={handleSubmit}>
      <label htmlFor="pokemonName">Add a Pokémon card</label>
      <div className="pokemon-form-row">
        <input
          id="pokemonName"
          type="text"
          value={pokemonName}
          onChange={(event) => setPokemonName(event.target.value)}
          placeholder="Try bulbasaur or mew"
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Loading…' : 'Fetch Pokémon'}
        </button>
      </div>
    </form>
  );
}

export default PokemonForm;
