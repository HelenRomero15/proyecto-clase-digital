import { motion } from "framer-motion";

function HeaderClase() {
  return (
    <motion.div
      className="hero"
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <span className="etiqueta">CLASE DIGITAL INTERACTIVA</span>

      <h1>¡Bienvenido a mi primera clase digital!</h1>

      <p className="hero-descripcion">
        Descubre cómo se crean las páginas web utilizando
        HTML, CSS y JavaScript.
      </p>

      <div className="hero-datos">
        <span>📚 Tecnología</span>
        <span>🎓 4t0 Bachillerato</span>
        <span>⏱️ 40 minutos</span>
      </div>

      <a href="#objetivos" className="boton-principal">
        Comenzar la clase ↓
      </a>
    </motion.div>
  );
}

export default HeaderClase;