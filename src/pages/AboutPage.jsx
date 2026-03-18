function AboutPage() {
  return (
    <section className="panel page-stack">
      <h2>Why avoid shared outlet state here?</h2>
      <p>
        This demo intentionally keeps the Pokémon list local to the home page so you can see how
        route navigation causes that state to reset.
      </p>
      <ol>
        <li>Home owns the Pokémon list with local component state.</li>
        <li>Navigating away unmounts Home and clears that local data.</li>
        <li>Returning home starts over with a fresh Pikachu card.</li>
      </ol>
    </section>
  );
}

export default AboutPage;
