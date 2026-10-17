
import HeaderClase from "./components/HeaderClase";
import ObjetivosCard from "./components/ObjetivosCard";
import ActividadItem from "./components/ActividadItem";
import "./index.css";

function App() {
  const indicadores = [
    "Identifica la estructura de un componente en React.",
    "Utiliza props para enviar información.",
    "Implementa useState para actualizar una actividad."
  ];

  const actividades = [
    "Leer el ejemplo de componentes.",
    "Identificar las props del encabezado.",
    "Marcar la actividad cuando esté terminada."
  ];

  return (
    <main className="contenedor">
      <HeaderClase
        titulo="Mi primera clase con React"
        curso="Tecnología"
        grado="Primero Básico"
      />

      <ObjetivosCard
        competencia="Construye interfaces digitales mediante componentes reutilizables e interactivos."
        indicadores={indicadores}
      />

      <section className="actividades">
        <h2>Actividades de aprendizaje</h2>
        <p>Marca cada actividad cuando la hayas terminado.</p>

        {actividades.map((actividad, index) => (
          <ActividadItem
            key={index}
            actividad={actividad}
          />
        ))}
      </section>

      <footer>
        Proyecto Integrador · Fase 3 · React y Vite
      </footer>
    </main>
  );
}

export default App;
