
import { useEffect, useState } from "react";
import { obtenerActividades } from "../services/api.js";

function ListaActividades() {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarActividades() {
      try {
        const datos = await obtenerActividades();
        setActividades(datos);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    cargarActividades();
  }, []);

  if (cargando) {
    return <p>Cargando actividades...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="seccion-actividades">
      <h2>Actividades registradas en NocoDB</h2>

      <p>
        Estas actividades se consultan directamente desde la base de datos.
      </p>

      {actividades.length === 0 ? (
        <p>No hay actividades registradas.</p>
      ) : (
        <div className="lista-actividades">
          {actividades.map((actividad) => (
            <article
              className="tarjeta-actividad"
              key={actividad.Id}
            >
              <h3>{actividad.Title}</h3>

              <p>
                <strong>Duración:</strong>{" "}
                {actividad["Duración"]}
              </p>

              <p>
                <strong>Categoría:</strong>{" "}
                {actividad.Categoria}
              </p>

              <p>
                <strong>Estado:</strong>{" "}
                {actividad.Completado === true
                  ? "Completada"
                  : actividad.Completado === false
                    ? "Pendiente"
                    : "Sin especificar"}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ListaActividades;
