
function ObjetivosCard({ competencia, indicadores }) {
  return (
    <section className="objetivos-card">
      <h2>Competencia de aprendizaje</h2>
      <p>{competencia}</p>

      <h3>Indicadores de logro</h3>
      <ul>
        {indicadores.map((indicador, index) => (
          <li key={index}>{indicador}</li>
        ))}
      </ul>
    </section>
  );
}

export default ObjetivosCard;
