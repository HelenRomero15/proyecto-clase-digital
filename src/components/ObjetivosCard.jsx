
import { motion } from "framer-motion";

function ObjetivosCard() {
  const objetivos = [
    "Identificar los elementos de una clase digital.",
    "Reconocer el uso de recursos tecnológicos.",
    "Participar en actividades interactivas.",
  ];

  return (
    <motion.section
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.25 }}
      style={{
        background: "#f0e6ff",
        padding: "20px",
        borderRadius: "16px",
        marginBottom: "20px",
        cursor: "pointer",
      }}
    >
      <h2>Objetivos de aprendizaje</h2>

      <ul>
        {objetivos.map((objetivo, index) => (
          <li key={index}>{objetivo}</li>
        ))}
      </ul>
    </motion.section>
  );
}

export default ObjetivosCard;
