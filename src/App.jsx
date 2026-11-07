
import ListaActividades from "./components/ListaActividades";
import "./App.css";

function App() {
  return (
    <main className="contenedor">
      <header className="encabezado">
        <h1>Plan de Clase Digital</h1>
        <p>
          Sistema de gestión de actividades de aprendizaje
        </p>
      </header>

      <ListaActividades />

      <footer>
        <p>Proyecto educativo desarrollado con React y NocoDB</p>
      </footer>
    </main>
  );
}

export default App;
