
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLaptop, FaUsers, FaServer, FaExclamationTriangle, FaCogs } from "react-icons/fa";
import "./Home.css";

function DashboardCard({ title, value, icon, color }) {
  return (
    <div className="card" style={{ borderTop: `5px solid ${color}` }}>
      <div className="card-header">
        <div className="card-icon">{icon}</div>
        <h2>{title}</h2>
      </div>
      <p>{value}</p>
    </div>
  );
}

function Home() {
  const [equipmentOpen, setEquipmentOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Menu lateral */}
      <aside className="sidebar">
        <div className="logo">InvenTI</div>
        <nav>
          <button className="menu-button" onClick={() => setConfigOpen(!configOpen)}>
            <FaCogs /> Configurações
          </button>
          {configOpen && (
            <div className="submenu">
              <button onClick={() => navigate("/usuarios")}>Usuários</button>
              <button onClick={() => navigate("/perfil")}>Perfis</button>
            </div>
          )}

          <button className="menu-button">Departamentos</button>

          <button className="menu-button" onClick={() => setEquipmentOpen(!equipmentOpen)}>
            <FaLaptop /> Equipamentos
          </button>
          {equipmentOpen && (
            <div className="submenu">
              <button>Notebooks</button>
              <button>Monitores</button>
              <button onClick={() => navigate("/impressora")}>Impressoras</button>
              <button onClick={() => navigate("/cartucho")}>Cartuchos</button>
              <button>Servidores</button>
              <button>Periféricos</button>
            </div>
          )}
        </nav>
      </aside>

      {/* Área principal */}
      <main className="main">
        <header className="header">
          <h1>Dashboard</h1>
          <div>Olá, Admin</div>
        </header>

        {/* Painel de resumo */}
        <div className="grid">
          <DashboardCard title="Total Equipamentos" value="120" icon={<FaLaptop />} color="#4CAF50" />
          <DashboardCard title="Equipamentos em estoque" value="5" icon={<FaServer />} color="#2196F3" />
          <DashboardCard title="Últimos em uso" value="8" icon={<FaUsers />} color="#FFC107" />
          <DashboardCard title="Alertas Estoque Baixo" value="2" icon={<FaExclamationTriangle />} color="#F44336" />
        </div>
      </main>
    </div>
  );
}

export default Home;
