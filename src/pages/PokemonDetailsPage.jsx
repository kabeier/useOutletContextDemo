import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

function PokemonDetailsPage() {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/${pokemonId}`);

        if (!response.ok) {
          throw new Error('Unable to load that Pokémon right now.');
        }

        const data = await response.json();
        setPokemon(data);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    };

    loadPokemon();
  }, [pokemonId]);

  if (status === 'loading') {
    return (
      <section className="panel page-stack">
        <h2>Loading Pokémon details…</h2>
        <Link to="/">Return home</Link>
      </section>
    );
  }

  if (status === 'error' || !pokemon) {
    return (
      <section className="panel page-stack">
        <h2>Pokémon not available</h2>
        <p>Try returning home and opening a different card.</p>
        <Link to="/">Return home</Link>
      </section>
    );
  }

  return (
    <section className="panel page-stack details-panel">
      <Link to="/">← Back to cards</Link>
      <div className="details-layout">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <div>
          <p className="eyebrow">Pokédex #{pokemon.id}</p>
          <h2>{pokemon.name}</h2>
          <p>
            This page fetches its own details instead of reading shared outlet context from the
            layout route.
          </p>
          <ul>
            <li>Height: {pokemon.height}</li>
            <li>Weight: {pokemon.weight}</li>
            <li>Base experience: {pokemon.base_experience}</li>
            <li>Types: {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}</li>
            <li>
              Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PokemonDetailsPage;
