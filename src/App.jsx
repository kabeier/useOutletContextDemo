import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React Router demo</p>
          <h1>Pokemon Cards</h1>
          <p className="hero-copy">
            This version keeps the Pokémon list on the home page, so it resets when that route
            unmounts.
          </p>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
