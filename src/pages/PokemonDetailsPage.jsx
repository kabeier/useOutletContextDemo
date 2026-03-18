import { Link, useOutletContext, useParams } from 'react-router-dom';

function PokemonDetailsPage() {
  const { pokemonId } = useParams();
  const { pokemonsData } = useOutletContext();

  const pokemon = pokemonsData.find((entry) => entry.id === Number(pokemonId));

  if (!pokemon) {
    return (
      <section className="panel page-stack">
        <h2>Pokémon not loaded yet</h2>
        <p>
          Visit the home page, fetch a card, and come back to view a detail page that uses the
          same shared state.
        </p>
        <Link to="/">Return home</Link>
      </section>
    );
  }

  return (
    <section className="panel page-stack details-panel">
      <Link to="/">← Back to cards</Link>
      <div className="details-layout">
        <img
          src={pokemon.shiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <div>
          <p className="eyebrow">Pokédex #{pokemon.id}</p>
          <h2>{pokemon.name}</h2>
          <p>
            Shared layout state keeps this page in sync with the shiny toggle you clicked on the
            card view.
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
