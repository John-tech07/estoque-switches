import { X } from "lucide-react";
import { useState } from "react";
import "./AddSwitch.css";

export default function AddSwitch({ onClose, onSuccess, initialData }) {
  const isEdit = Boolean(initialData);

  const [formData, setFormData] = useState(
    initialData || {
      modelo: "",
      marca: "",
      numero_portas: "",
      serial: "",
      status: "Ativo",
      localizacao: "",
    }
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.modelo ||
      !formData.marca ||
      !formData.numero_portas ||
      !formData.serial
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const url = isEdit
        ? `http://localhost:5000/switches/${initialData.id}`
        : "http://localhost:5000/switches";

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          numero_portas: Number(formData.numero_portas),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao salvar switch");
        return;
      }

      onSuccess();
      onClose();
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{isEdit ? "Editar Switch" : "Adicionar Novo Switch"}</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Modelo</label>
          <input
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
          />

          <label>Marca</label>
          <input
            name="marca"
            value={formData.marca}
            onChange={handleChange}
          />

          <label>Número de Portas</label>
          <input
            type="number"
            name="numero_portas"
            value={formData.numero_portas}
            onChange={handleChange}
          />

          <label>Número de Série</label>
          <input
            name="serial"
            value={formData.serial}
            onChange={handleChange}
            disabled={isEdit} // normalmente serial não muda
          />

          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Em Manutenção">Em Manutenção</option>
          </select>

          <label>Localização</label>
          <input
            name="localizacao"
            value={formData.localizacao}
            onChange={handleChange}
          />

          <div className="modal-actions">
            <button type="button" className="cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="confirm">
              {isEdit ? "Salvar Alterações" : "Adicionar Switch"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
