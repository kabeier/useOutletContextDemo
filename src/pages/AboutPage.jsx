function AboutPage() {
  return (
    <section className="panel page-stack">
      <h2>Why use useOutletContext?</h2>
      <p>
        This demo keeps the Pokémon list in the layout route so navigating away from Home does
        not reset the cards.
      </p>
      <ol>
        <li>The App layout owns the persistent Pokémon state.</li>
        <li>Home reads that state with `useOutletContext` instead of local state.</li>
        <li>Card and detail views stay in sync because they use the same shared data.</li>
      </ol>
    </section>
  );
}

export default AboutPage;
