
import { useState } from "react";
import { guardarEvaluacion } from "../services/api";

function EvaluacionForm() {
  const [nombre, setNombre] = useState("");
  const [grado, setGrado] = useState("Primero Básico");
  const [respuesta1, setRespuesta1] = useState("");
  const [respuesta2, setRespuesta2] = useState("");
  const [respuesta3, setRespuesta3] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setMensaje("");
    setError("");

    if (
      !nombre.trim() ||
      !respuesta1.trim() ||
      !respuesta2.trim() ||
      !respuesta3.trim()
    ) {
      setError("Completa todos los campos antes de enviar.");
      return;
    }

    const respuestasCorrectas = [
      "html",
      "css",
      "javascript"
    ];

    const respuestasUsuario = [
      respuesta1,
      respuesta2,
      respuesta3
    ];

    let puntos = 0;

    respuestasUsuario.forEach((respuesta, indice) => {
      if (
        respuesta.trim().toLowerCase() ===
        respuestasCorrectas[indice]
      ) {
        puntos += 1;
      }
    });

    const evaluacion = {
      Nombre: nombre.trim(),
      Grado: grado,
      Respuesta1: respuesta1.trim(),
      Respuesta2: respuesta2.trim(),
      Respuesta3: respuesta3.trim(),
      Calificacion: puntos
    };

    try {
      setGuardando(true);

      await guardarEvaluacion(evaluacion);

      setMensaje(
        `¡Evaluación guardada correctamente! Tu calificación es ${puntos} de 3.`
      );

      setNombre("");
      setRespuesta1("");
      setRespuesta2("");
      setRespuesta3("");

    } catch (err) {
      console.error("Error al enviar evaluación:", err);
      setError(
        err.message || "No fue posible guardar la evaluación. Intenta nuevamente."
      );
    } finally {
      setGuardando(false);
    }
  }

  return (
    <section className="seccion-evaluacion">
      <h2>Evaluación de aprendizaje</h2>

      <p>
        Responde las siguientes preguntas para comprobar
        lo aprendido en clase.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre del estudiante</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Escribe tu nombre"
          required
        />

        <label htmlFor="grado">Grado</label>
        <input
          id="grado"
          type="text"
          value={grado}
          onChange={(e) => setGrado(e.target.value)}
          required
        />

        <label htmlFor="respuesta1">
          1. ¿Qué lenguaje se utiliza para estructurar una página web?
        </label>
        <input
          id="respuesta1"
          type="text"
          value={respuesta1}
          onChange={(e) => setRespuesta1(e.target.value)}
          placeholder="Escribe tu respuesta"
          required
        />

        <label htmlFor="respuesta2">
          2. ¿Qué lenguaje se utiliza para dar estilos y diseño a una página web?
        </label>
        <input
          id="respuesta2"
          type="text"
          value={respuesta2}
          onChange={(e) => setRespuesta2(e.target.value)}
          placeholder="Escribe tu respuesta"
          required
        />

        <label htmlFor="respuesta3">
          3. ¿Qué lenguaje permite agregar interactividad a una página web?
        </label>
        <input
          id="respuesta3"
          type="text"
          value={respuesta3}
          onChange={(e) => setRespuesta3(e.target.value)}
          placeholder="Escribe tu respuesta"
          required
        />

        <button type="submit" disabled={guardando}>
          {guardando ? "Guardando..." : "Enviar evaluación"}
        </button>

        {mensaje && (
          <p className="mensaje-exito">{mensaje}</p>
        )}

        {error && (
          <p className="mensaje-error">{error}</p>
        )}
      </form>
    </section>
  );
}

export default EvaluacionForm;
