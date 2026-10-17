
function HeaderClase({ titulo, curso, grado }) {
  return (
    <header className="header-clase">
      <p className="etiqueta">PLAN DE CLASE DIGITAL</p>
      <h1>{titulo}</h1>
      <p>
        Curso: {curso} | Grado: {grado}
      </p>
    </header>
  );
}

export default HeaderClase;
