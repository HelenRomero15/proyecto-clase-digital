
import dotenv from "dotenv";

dotenv.config({ path: `${process.cwd()}/.env.local` });

export default async function handler(req, res) {
  const NOCODB_URL = process.env.NOCODB_URL;
  const NOCODB_TOKEN = process.env.NOCODB_TOKEN;
  const TABLE_ID = process.env.NOCODB_EVALUACIONES_TABLE_ID;

  if (!NOCODB_URL || !NOCODB_TOKEN || !TABLE_ID) {
    return res.status(500).json({
      error: "Faltan variables de conexión para evaluaciones."
    });
  }

  // Consultar si la API está funcionando
  if (req.method === "GET") {
    return res.status(200).json({
      mensaje: "API de evaluaciones funcionando correctamente."
    });
  }

  // Guardar evaluación
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido."
    });
  }

  try {
    let evaluacion = req.body;

    if (typeof evaluacion === "string") {
      evaluacion = JSON.parse(evaluacion);
    }

    if (!evaluacion || typeof evaluacion !== "object" || Array.isArray(evaluacion)) {
      return res.status(400).json({
        error: "Los datos enviados no son válidos."
      });
    }

    const campos = [
      "Nombre",
      "Grado",
      "Respuesta1",
      "Respuesta2",
      "Respuesta3",
      "Calificacion"
    ];

    for (const campo of campos) {
      if (evaluacion[campo] === undefined || evaluacion[campo] === null) {
        return res.status(400).json({
          error: `Falta el campo: ${campo}`
        });
      }
    }

    const datos = {
      Nombre: String(evaluacion.Nombre),
      Grado: String(evaluacion.Grado),
      Respuesta1: String(evaluacion.Respuesta1),
      Respuesta2: String(evaluacion.Respuesta2),
      Respuesta3: String(evaluacion.Respuesta3),
      Calificacion: Number(evaluacion.Calificacion)
    };

    if (!Number.isFinite(datos.Calificacion)) {
      return res.status(400).json({
        error: "La calificación debe ser un número."
      });
    }

    const respuesta = await fetch(
      `${NOCODB_URL}/api/v2/tables/${TABLE_ID}/records`,
      {
        method: "POST",
        headers: {
          "xc-token": NOCODB_TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify([datos])
      }
    );

    const resultado = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
      console.error("Error de NocoDB:", respuesta.status, resultado);

      return res.status(respuesta.status).json({
        error: "NocoDB no pudo guardar la evaluación.",
        detalle: resultado
      });
    }

    return res.status(200).json({
      mensaje: "Evaluación guardada correctamente.",
      datos: resultado
    });

  } catch (error) {
    console.error("Error al guardar evaluación:", error);

    return res.status(500).json({
      error: "Error interno al guardar la evaluación.",
      detalle: error.message
    });
  }
}
