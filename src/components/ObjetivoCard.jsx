import { motion } from "framer-motion";

const objetivos = [
  {
    icono: "🎯",
    titulo: "Identificar",
    descripcion:
      "Reconocer qué es HTML y comprender cómo organiza los elementos de una página web."
  },
  {
    icono: "🎨",
    titulo: "Comprender",
    descripcion:
      "Identificar cómo CSS permite modificar los colores, tamaños y estilos de una página."
  },
  {
    icono: "💻",
    titulo: "Aplicar",
    descripcion:
      "Explicar cómo JavaScript permite agregar interactividad a los sitios web."
  }
];

function ObjetivoCard() {
  return (
    <section id="objetivos" className="seccion">
      <div className="titulo-seccion">
        <span className="subtitulo">LO QUE APRENDERÁS</span>
        <h2>Objetivos de aprendizaje</h2>
        <p>Al finalizar la clase podrás:</p>
      </div>

      <div className="tarjetas-grid">
        {objetivos.map((objetivo, index) => (
          <motion.div
            className="tarjeta objetivo-card"
            key={objetivo.titulo}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ y: -5 }}
          >
            <span className="icono-grande">{objetivo.icono}</span>
            <h3>{objetivo.titulo}</h3>
            <p>{objetivo.descripcion}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ObjetivoCard;