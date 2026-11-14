
async function manejarRespuesta(respuesta) {
  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    console.error("Error de API:", resultado);

    const detalle = resultado.detalle?.message ||
      resultado.detalle?.msg ||
      resultado.error ||
      "Ocurrió un error en la solicitud.";

    throw new Error(detalle);
  }

  return resultado;
}

// Obtener actividades desde NocoDB
export async function obtenerActividades() {
  const respuesta = await fetch("/api/actividades");
  const resultado = await manejarRespuesta(respuesta);

  return Array.isArray(resultado)
    ? resultado
    : resultado.list || resultado.records || [];
}

// Obtener evaluaciones
export async function obtenerEvaluaciones() {
  const respuesta = await fetch("/api/evaluaciones");
  const resultado = await manejarRespuesta(respuesta);

  return Array.isArray(resultado)
    ? resultado
    : resultado.list || resultado.records || [];
}

// Guardar evaluación
export async function guardarEvaluacion(evaluacion) {
  const respuesta = await fetch("/api/evaluaciones", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(evaluacion)
  });

  return await manejarRespuesta(respuesta);
}
