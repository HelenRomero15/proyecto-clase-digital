import { useEffect, useState } from "react";

import HeaderClase from "./components/HeaderClase";
import ObjetivoCard from "./components/ObjetivoCard";
import ContenidoClase from "./components/ContenidoClase";
import ActividadItem from "./components/ActividadItem";
import EvaluacionForm from "./components/EvaluacionForm";
import ActividadesNocoDB from "./components/ActividadesNocoDB.jsx";
import Footer from "./components/Footer";

import { obtenerEvaluaciones } from "./services/api";

import "./App.css";

function App() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  async function cargarEvaluaciones() {
    try {
      setError("");

      const datos = await obtenerEvaluaciones();

      setEvaluaciones(datos);
    } catch (err) {
      console.error(err);
      setError("No fue posible cargar los registros.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarEvaluaciones();
  }, []);

  return (
    <div className="app">
      <HeaderClase />

      <main className="contenedor">
        <ObjetivoCard />

        <ContenidoClase />

        <ActividadItem />

        <ActividadesNocoDB />

        <EvaluacionForm onGuardado={cargarEvaluaciones} />

        <section className="seccion" id="registros">
          <div className="titulo-seccion">
            <span className="subtitulo"></span>
            <p>

            </p>
          </div>

          <div className="registros-card">
            {cargando ? (
              <p>Cargando evaluaciones...</p>
            ) : error ? (
              <p className="error-texto">{error}</p>
            ) : evaluaciones.length === 0 ? (
              <p>
                
              </p>
            ) : (
              <>
                <p className="total-registros">
                  Total de registros: {evaluaciones.length}
                </p>

                <div className="tabla-contenedor">
                  <table>
                    <thead>
                      <tr>
                        <th>Estudiante</th>
                        <th>Grado</th>
                        <th>Calificación</th>
                      </tr>
                    </thead>

                    <tbody>
                      {evaluaciones.map((item, index) => (
                        <tr key={item.Id || index}>
                          <td>{item.Nombre}</td>
                          <td>{item.Grado}</td>
                          <td>{item.Calificacion}/100</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;