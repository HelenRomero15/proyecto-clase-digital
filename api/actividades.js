
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {
    const token = process.env.NOCODB_TOKEN;

    if (!token) {
      return res.status(500).json({
        error: "No se configuró el token de NocoDB"
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

    if (!respuesta.ok) {
      throw new Error(
        `Error de NocoDB: ${respuesta.status}`
      );
    }

    const datos = await respuesta.json();

    return res.status(200).json(datos);

  } catch (error) {
    console.error("Error de conexión:", error);

    return res.status(500).json({
      error: "No fue posible obtener las actividades"
    });
  }
}
