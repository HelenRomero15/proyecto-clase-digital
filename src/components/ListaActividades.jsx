import { useEffect, useState } from "react";

function ListaActividades() {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerActividades = async () => {
      try {
        setCargando(true);
        setError("");

        const respuesta = await fetch("/api/actividades");

        if (!respuesta.ok) {
          throw new Error("No fue posible obtener las actividades");
        }

        const datos = await respuesta.json();

        // Obtener los registros según la estructura de respuesta
        const registros = Array.isArray(datos.list)
          ? datos.list
          : Array.isArray(datos.records)
          ? datos.records
          : Array.isArray(datos)
          ? datos
          : [];

        // Adaptar los registros de NocoDB
        const actividadesFormateadas = registros.map((registro) => {
          const fields = registro.fields ?? registro;

          const valorEstado = fields.Completado;

          const completado =
            valorEstado === true ||
            valorEstado === "true" ||
            valorEstado === 1 ||
            valorEstado === "1";

          return {
            id: registro.Id ?? registro.id,
            titulo: fields.Title ?? "Sin título",
            duracion: fields["Duración"] ?? "Sin duración",
            categoria: fields.Categoria ?? "Sin categoría",
            completado
          };
        });

        setActividades(actividadesFormateadas);

      } catch (error) {
        console.error("Error al cargar actividades:", error);
        setError("No fue posible conectar con NocoDB.");
      } finally {
        setCargando(false);
      }
    };

    obtenerActividades();
  }, []);

  if (cargando) {
    return (
      <section className="lista-actividades">
        <p className="mensaje-carga">Cargando actividades...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="lista-actividades">
        <p className="mensaje-error">{error}</p>
      </section>
    );
  }

  return (
    <section className="lista-actividades">
      <h2>Actividades de aprendizaje</h2>

      <p className="subtitulo-actividades">
        Consulta las actividades registradas en tu plan de clase.
      </p>

      {actividades.length === 0 ? (
        <p className="mensaje-vacio">
          No hay actividades registradas en este momento.
        </p>
      ) : (
        <div className="actividades-grid">
          {actividades.map((actividad, index) => (
            <article
              className="actividad-card"
              key={actividad.id ?? index}
            >
              <h3>{actividad.titulo}</h3>

              <p>
                <strong>Duración:</strong> {actividad.duracion}
              </p>

              <p>
                <strong>Categoría:</strong> {actividad.categoria}
              </p>

              <span
                className={`estado ${
                  actividad.completado
                    ? "estado-completado"
                    : "estado-pendiente"
                }`}
              >
                {actividad.completado
                  ? "Completado"
                  : "Pendiente"}
              </span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ListaActividades;