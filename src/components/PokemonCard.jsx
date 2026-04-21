import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PokemonCard({ data, rmData, updateData }) {
  const [shiny, setShiny] = useState(Boolean(data.shiny));
  const navigate = useNavigate();

  useEffect(() => {
    setShiny(Boolean(data.shiny));
  }, [data.shiny]);

  const handleShine = () => {
    const nextShinyValue = !shiny;
    updateData(data, nextShinyValue);
    setShiny(nextShinyValue);
  };

  const handleCry = () => {
    if (data.cries?.latest) {
      new Audio(data.cries.latest).play().catch(() => {});
    }
  };

  return (
    <article className="pokemon-card">
      <div className="pokemon-card-header">
        <p className="pokemon-number">#{data.id}</p>
        <h3>{data.name}</h3>
      </div>
      <img
        src={shiny ? data.sprites.front_shiny : data.sprites.front_default}
        alt={data.name}
      />
      <p>
        Types: {data.types.map((typeInfo) => typeInfo.type.name).join(', ')}
      </p>
      <div className="button-row">
        <button onClick={handleShine}>
          {shiny ? 'Un-shine' : 'Shine'}
        </button>
        <button onClick={handleCry} disabled={!data.cries?.latest}>Cry</button>
        <button onClick={() => navigate(`/pokemon/${data.id}`)}>See details</button>
        <button className="danger-button" onClick={() => rmData(data)}>
          Remove
        </button>
      </div>
    </article>
  );
}

export default PokemonCard;
