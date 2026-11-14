
import dotenv from "dotenv";

dotenv.config({
  path: `${process.cwd()}/.env.local`,
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  try {
    const urlBase = process.env.NOCODB_URL;
    const token = process.env.NOCODB_TOKEN;
    const tableId = process.env.NOCODB_ACTIVIDADES_TABLE_ID;

    // Comprobar variables
    if (!urlBase || !token || !tableId) {
      return res.status(500).json({
        error: "Faltan variables de conexión",
        urlConfigurada: Boolean(urlBase),
        tokenConfigurado: Boolean(token),
        idTablaConfigurado: Boolean(tableId),
      });
    }

    const url =
      `${urlBase}/api/v2/tables/${tableId}/records?limit=100`;

    const respuesta = await fetch(url, {
      method: "GET",
      headers: {
        "xc-token": token,
        "Content-Type": "application/json",
      },
    });

    const texto = await respuesta.text();

    let data;

    try {
      data = JSON.parse(texto);
    } catch {
      data = { respuesta: texto };
    }

    if (!respuesta.ok) {
      console.error("Error de NocoDB:", respuesta.status, data);

      return res.status(respuesta.status).json({
        error: "NocoDB respondió con un error",
        estado: respuesta.status,
        detalle: data,
      });
    }

    const actividades = Array.isArray(data)
      ? data
      : data.list || data.records || [];

    return res.status(200).json(actividades);

  } catch (error) {
    console.error("Error al consultar actividades:", error);

    return res.status(500).json({
      error: "No fue posible consultar las actividades",
      detalle: error.message,
    });
  }
}
