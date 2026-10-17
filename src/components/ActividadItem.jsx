
import { useState } from "react";

function ActividadItem({ actividad }) {
  const [completada, setCompletada] = useState(false);

  return (
    <div className="actividad-item">
      <label className="actividad-label">
        <input
          type="checkbox"
          checked={completada}
          onChange={(evento) =>
            setCompletada(evento.target.checked)
          }
        />

        <span className={completada ? "completada" : ""}>
          {actividad}
        </span>
      </label>

      <p className="estado-actividad">
        Estado: {completada ? "Completada" : "Pendiente"}
      </p>
    </div>
  );
}

export default ActividadItem;
