import { useMemo, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  const [pokemonsData, setPokemonsData] = useState([]);

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

  const outletContext = useMemo(
    () => ({ pokemonsData, addData, rmData, updateData }),
    [pokemonsData],
  );

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React Router demo</p>
          <h1>Pokemon Cards</h1>
          <p className="hero-copy">
            This app stores Pokémon in the layout route so the list survives page navigation.
          </p>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <main>
        <Outlet context={outletContext} />
      </main>
    </div>
  );
}

export default App;
