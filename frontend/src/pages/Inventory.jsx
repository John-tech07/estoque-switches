import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SwitchTable from "../components/SwitchTable/SwitchTable";

import "./Inventory.css";
import AddSwitch from "../components/AddSwitch/AddSwitch";

const Inventory = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/", { replace: true });
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const [editingSwitch, setEditingSwitch] = useState(null);
  const handleEdit = (sw) => {
    setEditingSwitch(sw);
    setShowModal(true);
  };

  const fetchSwitches = async () => {
    const response = await fetch("http://localhost:5000/switches");
    const data = await response.json();
    setSwitches(data);
  };
  useEffect(() => {
    fetchSwitches();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja remover este switch?",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/switches/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Erro ao remover switch");
        return;
      }

      fetchSwitches();
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  const [switches, setSwitches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/switches")
      .then((res) => res.json())
      .then((data) => setSwitches(data))
      .catch(() => alert("Erro ao carregar switches"));
  }, []);

  if (!isAuthenticated) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="inventory-page">
      <div className="inventory-container">
        <header className="inventory-header">
          <h1>Gerenciamento de Switches</h1>

          <div className="header-actions">
            <button className="add-button" onClick={() => setShowModal(true)}>
              <Plus size={18} /> Novo Switch
            </button>
            <button onClick={handleLogout} className="logout-button">
              Sair
            </button>
          </div>
        </header>

        <div className="inventory-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Pesquisar por modelo, serial ou localização..."
          />
        </div>

        <div className="table-container">
          <div className="table-container">
            <SwitchTable
              switches={switches}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        </div>

        {showModal && (
          <AddSwitch
            onClose={() => {
              setShowModal(false);
              setEditingSwitch(null);
            }}
            onSuccess={fetchSwitches}
            initialData={editingSwitch}
          />
        )}
      </div>
    </div>
  );
};

export default Inventory;
