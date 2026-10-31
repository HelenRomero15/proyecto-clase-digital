
import { motion } from "framer-motion";

function HeaderClase() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        background: "#dceafe",
        padding: "24px",
        borderRadius: "16px",
        marginBottom: "24px",
        textAlign: "center",
      }}
    >
      <h1>Plan de Clase Digital Interactivo</h1>
      <p>Aprendemos tecnología de forma dinámica</p>
    </motion.header>
  );
}

export default HeaderClase;
