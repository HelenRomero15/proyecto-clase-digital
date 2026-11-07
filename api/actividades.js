
export default async function handler(req, res) {

  // 1. Verificar el método HTTP
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {

    // 2. Recuperar el token protegido
    const token = process.env.NOCODB_TOKEN;

    if (!token) {
      return res.status(500).json({
        error: "No se encontró NOCODB_TOKEN"
      });
    }

    // 3. Conectar con NocoDB
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

    // 4. Comprobar la respuesta
    const texto = await respuesta.text();

    if (!respuesta.ok) {
      console.error(
        "Error de NocoDB:",
        respuesta.status,
        texto
      );

      return res.status(respuesta.status).json({
        error: "NocoDB rechazó la solicitud",
        status: respuesta.status
      });
    }

    // 5. Convertir la respuesta a JSON
    const datos = JSON.parse(texto);

    // 6. Devolver los datos a React
    return res.status(200).json(datos);

  } catch (error) {

    // 7. Controlar errores
    console.error("Error del servidor:", error);

    return res.status(500).json({
      error: "Error interno al conectar con NocoDB"
    });

  }
}
