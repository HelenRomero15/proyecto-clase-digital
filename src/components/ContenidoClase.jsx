import { motion } from "framer-motion";

const contenidos = [
  {
    numero: "01",
    nombre: "HTML",
    icono: "🏗️",
    descripcion: "La estructura de una página web",
    explicacion:
      "HTML significa HyperText Markup Language. Es un lenguaje de marcado que permite organizar los elementos de una página web, como títulos, párrafos, imágenes y enlaces.",
    analogia:
      "HTML es como la estructura de una casa. Define dónde estarán las habitaciones, las puertas y las ventanas.",
    ejemplo: "<h1>Mi primera página web</h1>",
    resultado: "Mi primera página web"
  },
  {
    numero: "02",
    nombre: "CSS",
    icono: "🎨",
    descripcion: "El diseño de una página web",
    explicacion:
      "CSS significa Cascading Style Sheets. Permite cambiar la apariencia de una página web mediante colores, tamaños, fuentes, márgenes y distribución de elementos.",
    analogia:
      "CSS es como decorar una casa. Permite elegir los colores de las paredes, los muebles y la distribución visual.",
    ejemplo: "h1 { color: blue; }",
    resultado: "El título tendrá color azul."
  },
  {
    numero: "03",
    nombre: "JavaScript",
    icono: "⚡",
    descripcion: "La interactividad de una página web",
    explicacion:
      "JavaScript es un lenguaje de programación que permite agregar funciones interactivas a una página, como botones, mensajes, formularios y respuestas a las acciones del usuario.",
    analogia:
      "JavaScript es como el sistema eléctrico de una casa. Permite que algunos elementos funcionen cuando se necesita.",
    ejemplo: 'alert("¡Bienvenido!");',
    resultado: "Aparece un mensaje de bienvenida."
  }
];

function ContenidoClase() {
  return (
    <section id="contenido" className="seccion">
      <div className="titulo-seccion">
        <span className="subtitulo">APRENDE PASO A PASO</span>
        <h2>Conoce las tecnologías web</h2>
        <p>
          Cada tecnología cumple una función importante
          en la creación de una página web.
        </p>
      </div>

      <div className="contenido-lista">
        {contenidos.map((item, index) => (
          <motion.article
            className="tarjeta contenido-card"
            key={item.nombre}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="contenido-encabezado">
              <span className="numero">{item.numero}</span>
              <span className="icono-grande">{item.icono}</span>
              <div>
                <h3>{item.nombre}</h3>
                <p>{item.descripcion}</p>
              </div>
            </div>

            <p>{item.explicacion}</p>

            <div className="analogia">
              <strong>💡 Analogía de la vida cotidiana</strong>
              <p>{item.analogia}</p>
            </div>

            <div className="codigo-ejemplo">
              <strong>Ejemplo de código:</strong>
              <pre>
                <code>{item.ejemplo}</code>
              </pre>
              <p>Resultado: {item.resultado}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default ContenidoClase;