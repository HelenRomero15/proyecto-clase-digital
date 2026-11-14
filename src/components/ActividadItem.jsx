import { useState } from "react";
import { motion } from "framer-motion";

const preguntas = [
  {
    pregunta: "¿Qué tecnología permite crear la estructura de una página web?",
    opciones: ["CSS", "HTML", "JavaScript"],
    correcta: "HTML",
    explicacion:
      "¡Correcto! HTML organiza los elementos que forman una página web."
  },
  {
    pregunta: "¿Qué tecnología permite cambiar los colores y estilos?",
    opciones: ["JavaScript", "HTML", "CSS"],
    correcta: "CSS",
    explicacion:
      "¡Muy bien! CSS controla la apariencia visual de una página web."
  },
  {
    pregunta: "¿Qué tecnología permite agregar interactividad?",
    opciones: ["CSS", "JavaScript", "HTML"],
    correcta: "JavaScript",
    explicacion:
      "¡Excelente! JavaScript permite crear funciones interactivas."
  }
];

function ActividadItem() {
  const [respuestas, setRespuestas] = useState({});
  const [finalizado, setFinalizado] = useState(false);

  function seleccionarRespuesta(indice, respuesta) {
    if (finalizado) return;

    setRespuestas({
      ...respuestas,
      [indice]: respuesta
    });
  }

  function verificarRespuestas() {
    if (Object.keys(respuestas).length !== preguntas.length) {
      alert("Debes responder todas las preguntas.");
      return;
    }

    setFinalizado(true);
  }

  const puntos = preguntas.filter(
    (pregunta, indice) =>
      respuestas[indice] === pregunta.correcta
  ).length;

  function reiniciar() {
    setRespuestas({});
    setFinalizado(false);
  }

  return (
    <section id="actividad" className="seccion">
      <div className="titulo-seccion">
        <span className="subtitulo">PON A PRUEBA LO APRENDIDO</span>
        <h2>Actividad interactiva</h2>
        <p>Selecciona la respuesta correcta.</p>
      </div>

      <div className="actividad-contenedor">
        {preguntas.map((pregunta, indice) => (
          <motion.div
            className="pregunta-card"
            key={indice}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="pregunta-numero">
              Pregunta {indice + 1}
            </span>

            <h3>{pregunta.pregunta}</h3>

            <div className="opciones">
              {pregunta.opciones.map((opcion) => (
                <button
                  key={opcion}
                  disabled={finalizado}
                  onClick={() =>
                    seleccionarRespuesta(indice, opcion)
                  }
                  className={`opcion ${
                    respuestas[indice] === opcion
                      ? "opcion-seleccionada"
                      : ""
                  }`}
                >
                  {opcion}
                </button>
              ))}
            </div>

            {finalizado && (
              <div className="retroalimentacion">
                {respuestas[indice] === pregunta.correcta
                  ? "✅ ¡Respuesta correcta!"
                  : `❌ La respuesta correcta es ${pregunta.correcta}.`}
                <p>{pregunta.explicacion}</p>
              </div>
            )}
          </motion.div>
        ))}

        {!finalizado ? (
          <button
            className="boton-principal"
            onClick={verificarRespuestas}
          >
            Comprobar mis respuestas
          </button>
        ) : (
          <div className="resultado-actividad">
            <h3>¡Actividad finalizada!</h3>
            <p>
              Obtuviste {puntos} de {preguntas.length} respuestas correctas.
            </p>
            <button className="boton-secundario" onClick={reiniciar}>
              Volver a intentar
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ActividadItem;