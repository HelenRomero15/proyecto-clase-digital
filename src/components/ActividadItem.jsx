
import { useState } from "react";
import { motion } from "framer-motion";

function ActividadItem({ actividad }) {
  const [completada, setCompletada] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        padding: "16px",
        marginBottom: "12px",
        borderRadius: "12px",
        background: completada ? "#d9f7e5" : "#f3f4f6",
        border: "1px solid #d1d5db",
      }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={completada}
          onChange={() => setCompletada(!completada)}
        />

        <span
          style={{
            textDecoration: completada ? "line-through" : "none",
            flex: 1,
          }}
        >
          {actividad}
        </span>
      </label>

      <p>
        Estado: {completada ? "Completada" : "Pendiente"}
      </p>
    </motion.div>
  );
}

export default ActividadItem;
