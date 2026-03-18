import { useEffect, useMemo, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import PokemonForm from '../components/PokemonForm';

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

function HomePage() {
  const [pokemonsData, setPokemonsData] = useState([]);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const sortedPokemon = useMemo(
    () => [...pokemonsData].sort((left, right) => left.id - right.id),
    [pokemonsData],
  );

  const addData = (data) => {
    setPokemonsData((currentPokemon) => {
      const alreadyLoaded = currentPokemon.some((pokemon) => pokemon.id === data.id);

      if (alreadyLoaded) {
        return currentPokemon;
      }

      return [...currentPokemon, { ...data, shiny: data.shiny ?? false }];
    });
  };

  const updateData = (data, shiny) => {
    setPokemonsData((currentPokemon) =>
      currentPokemon.map((pokemon) =>
        pokemon.id === data.id ? { ...pokemon, shiny } : pokemon,
      ),
    );
  };

  const rmData = (data) => {
    setPokemonsData((currentPokemon) =>
      currentPokemon.filter((pokemon) => pokemon.id !== data.id),
    );
  };

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
          <h2>Build a local Pokémon list</h2>
          <p>
            This page owns its own state, so navigating away from Home unmounts the list and the
            cards load again when you come back.
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
