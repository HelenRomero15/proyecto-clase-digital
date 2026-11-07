
import { useState, useEffect } from "react";
import "./ListaActividades.css";

function ListaActividades() {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controlador = new AbortController();

    async function obtenerActividades() {
      try {
        setCargando(true);
        setError("");

        const respuesta = await fetch(
          import.meta.env.VITE_NOCODB_URL,
          {
            method: "GET",
            headers: {
              "xc-token": import.meta.env.VITE_NOCODB_TOKEN,
              "Content-Type": "application/json"
            },
            signal: controlador.signal
          }
        );

        if (!respuesta.ok) {
          throw new Error(
            `Error HTTP: ${respuesta.status}`
          );
        }

        const datos = await respuesta.json();

        const registros = datos.list || datos.records || [];

        setActividades(registros);

      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error al conectar con NocoDB:", error);
          setError(error.message);
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    obtenerActividades();

    return () => controlador.abort();

  }, []);

  if (cargando) {
    return (
      <p className="mensaje-carga">
        Cargando actividades...
      </p>
    );
  }

  if (error) {
    return (
      <p className="mensaje-error">
        No se pudieron cargar las actividades: {error}
      </p>
    );
  }

  return (
    <section className="lista-actividades">

      <h2>Actividades de aprendizaje</h2>

      <p className="subtitulo">
        Actividades obtenidas desde NocoDB
      </p>

      {actividades.length === 0 ? (
        <p>No hay actividades registradas.</p>
      ) : (

        <div className="contenedor-actividades">

          {actividades.map((item, indice) => {

            const actividad = item.fields || item;

            return (
              <article
                className="tarjeta-actividad"
                key={item.Id || item.id || indice}
              >

                <h3>
                  {actividad.Title || "Sin título"}
                </h3>

                <p>
                  <strong>Duración:</strong>{" "}
                  {actividad["Duración"] || "No especificada"}
                </p>

                <p>
                  <strong>Categoría:</strong>{" "}
                  {actividad.Categoria || "Sin categoría"}
                </p>

                <span
                  className={
                    actividad.Completado
                      ? "estado completado"
                      : "estado pendiente"
                  }
                >
                  {actividad.Completado
                    ? "Completado"
                    : "Pendiente"}
                </span>

              </article>
            );

          })}

        </div>

      )}

    </section>
  );
}

export default ListaActividades;
