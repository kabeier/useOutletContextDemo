import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import PokemonForm from '../components/PokemonForm';

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

function HomePage() {
  const { pokemonsData, addData, rmData, updateData } = useOutletContext();
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const sortedPokemon = useMemo(
    () => [...pokemonsData].sort((left, right) => left.id - right.id),
    [pokemonsData],
  );

  const addCard = async (name, event = null) => {
    event?.preventDefault();

    const normalizedName = name.trim().toLowerCase();

    if (!normalizedName) {
      setErrorMessage('Enter a Pokémon name before searching.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/${normalizedName}`);

      if (!response.ok) {
        throw new Error(`We could not find “${name}”.`);
      }

      const data = await response.json();
      addData(data);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong while loading that Pokémon.');
    }
  };

  useEffect(() => {
    if (pokemonsData.length === 0) {
      addCard('pikachu');
    }
  }, []);

  return (
    <section className="page-stack">
      <div className="panel intro-panel">
        <div>
          <h2>Build a list that persists between routes</h2>
          <p>
            `useOutletContext` lets this page read the Pokémon state from the layout route
            instead of re-creating it every time Home remounts.
          </p>
        </div>
        <PokemonForm addCard={addCard} status={status} />
      </div>

      {errorMessage ? <p className="error-banner">{errorMessage}</p> : null}

      <div className="card-grid" id="cardHolder">
        {sortedPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            data={pokemon}
            rmData={rmData}
            updateData={updateData}
          />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
