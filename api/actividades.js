export default async function handler(req, res) {
  // Permitir únicamente solicitudes GET
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {
    const token = process.env.NOCODB_TOKEN;

    if (!token) {
      return res.status(500).json({
        error: "No se encontró NOCODB_TOKEN en las variables de entorno"
      });
    }

    const respuesta = await fetch(
      "https://app.nocodb.com/api/v2/tables/ml2jeto7wf6wl9l/records",
      {
        method: "GET",
        headers: {
          "xc-token": token,
          "Content-Type": "application/json"
        }
      }
    );

    const texto = await respuesta.text();

    if (!respuesta.ok) {
      console.error("Error de NocoDB:", respuesta.status, texto);

      return res.status(respuesta.status).json({
        error: "NocoDB rechazó la solicitud",
        status: respuesta.status
      });
    }

    const datos = JSON.parse(texto);

    return res.status(200).json(datos);

  } catch (error) {
    console.error("Error del servidor:", error);

    return res.status(500).json({
      error: "Error interno al conectar con NocoDB"
    });
  }
}