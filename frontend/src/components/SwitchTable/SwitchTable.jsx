import { Pencil, Trash2 } from "lucide-react";
import "./SwitchTable.css";

const SwitchTable = ({ switches, onDelete, onEdit }) => {
  return (
    <table className="inventory-table">
      <thead>
        <tr>
          <th>Modelo</th>
          <th>Nº de Série</th>
          <th>Marca</th>
          <th>Nº de Portas</th> 
          <th>Localização</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        {switches.map((sw) => {
          const statusClass = sw.status
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/\s+/g, "-");

          return (
            <tr key={sw.id}>
              <td>{sw.modelo}</td>
              <td>{sw.serial}</td>
              <td>{sw.marca}</td>
              <td>{sw.numero_portas}</td> 
              <td>{sw.localizacao}</td>
              <td>
                <span className={`status ${statusClass}`}>{sw.status}</span>
              </td>
              <td className="actions">
                <button className="icon-btn edit" onClick={() => onEdit(sw)}>
                  <Pencil size={18} />
                </button>

                <button
                  className="icon-btn delete"
                  onClick={() => onDelete(sw.id)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SwitchTable;
