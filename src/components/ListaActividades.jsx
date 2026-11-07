
import { useEffect, useState } from "react";

function ListaActividades() {

  // Estados del componente
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Obtener los registros de NocoDB
  useEffect(() => {

    fetch("/api/actividades")

      .then((respuesta) => {

        if (!respuesta.ok) {
          throw new Error(
            "No fue posible obtener las actividades"
          );
        }

        return respuesta.json();

      })

      .then((datos) => {

        // Identificar la lista de registros
        const registros = Array.isArray(datos.list)
          ? datos.list
          : Array.isArray(datos.records)
          ? datos.records
          : Array.isArray(datos)
          ? datos
          : [];

        // Extraer y organizar los campos
        const actividadesFormateadas = registros.map(
          (registro) => {

            const fields = registro.fields ?? registro;

            return {
              id: registro.Id ?? registro.id,
              titulo: fields.Title ?? "Sin título",
              duracion: fields["Duración"] ?? "Sin duración",
              completado: fields.Completado ?? "Sin estado",
              categoria: fields.Categoria ?? "Sin categoría"
            };

          }
        );

        setActividades(actividadesFormateadas);

      })

      .catch((error) => {

        console.error("Error al cargar actividades:", error);

        setError(
          "No fue posible conectar con NocoDB."
        );

      })

      .finally(() => {

        setCargando(false);

      });

  }, []);

  // Mensaje de carga
  if (cargando) {
    return <p>Cargando actividades...</p>;
  }

  // Mensaje de error
  if (error) {
    return (
      <p className="mensaje-error">
        {error}
      </p>
    );
  }

  // Mostrar las actividades
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

              <h3>{actividad.titulo}</h3>

              <p>
                <strong>Duración:</strong>{" "}
                {actividad.duracion}
              </p>

              <p>
                <strong>Categoría:</strong>{" "}
                {actividad.categoria}
              </p>

              <span className="estado">
                {String(actividad.completado)}
              </span>

            </article>

          ))}

        </div>

      )}

    </section>

  );

}

export default ListaActividades;
