
import { useEffect, useState } from "react";

function ListaActividades() {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/actividades")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los datos");
        }

        return respuesta.json();
      })
      .then((datos) => {
        const registros = datos.list || datos.records || [];

        const actividadesFormateadas = registros.map(
          (registro) => {
            const fields = registro.fields ?? registro;

            return {
              id: registro.Id ?? registro.id,
              actividad:
                fields.Actividad ?? "Sin actividad",
              descripcion:
                fields.Descripcion ?? "Sin descripción",
              estado:
                fields.Estado ?? "Sin estado"
            };
          }
        );

        setActividades(actividadesFormateadas);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("No fue posible conectar con NocoDB.");
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando actividades...</p>;
  }

  if (error) {
    return <p className="mensaje-error">{error}</p>;
  }

  return (
    <section className="lista-actividades">
      <h2>Actividades de aprendizaje</h2>

      {actividades.length === 0 ? (
        <p>No hay actividades registradas.</p>
      ) : (
        <div className="actividades-grid">
          {actividades.map((actividad, index) => (
            <article
              className="actividad-card"
              key={actividad.id ?? index}
            >
              <h3>{actividad.actividad}</h3>

              <p>{actividad.descripcion}</p>

              <span className="estado">
                {actividad.estado}
              </span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ListaActividades;
