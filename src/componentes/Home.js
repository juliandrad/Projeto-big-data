
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCogs, FaLaptop, FaBuilding, FaChartBar, FaUsers, FaServer, FaExclamationTriangle } from "react-icons/fa";
import "./Home.css";

function DashboardCard({ title, value, icon, color }) {
  return (
    <div className="card" style={{ borderTop: `5px solid ${color}` }}>
      <div className="card-header">
        <div className="card-icon">{icon}</div>
        <h2>{title}</h2>
      </div>
      <p className="card-value">{value}</p>
    </div>
  );
}

// Componente de item de menu com submenu
function SidebarMenu({ icon, label, submenuItems }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.path) navigate(item.path);
    if (item.action) item.action();
  };

  return (
    <div className="menu-item">
      <button className="menu-button" onClick={() => setOpen(!open)}>
        {icon} <span>{label}</span>
        {submenuItems && <span className="arrow">{open ? "▲" : "▼"}</span>}
      </button>
      {open && submenuItems && (
        <div className="submenu">
          {submenuItems.map((item, index) => (
            <button key={index} onClick={() => handleClick(item)}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Home com sidebar
function Home() {
  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">InvenTI</div>
        <nav>
        <SidebarMenu icon={<FaChartBar />} label="Início" path="/home" 
            submenuItems={[
              { label: "Dashboard", path: "/home"}
            ]}/>
          <SidebarMenu
            icon={<FaCogs />}
            label="Configurações"
            submenuItems={[
              { label: "Usuários", path: "/usuarios" },
              { label: "Perfis", path: "/perfil" },
            ]}
          />
          <SidebarMenu
            icon={<FaLaptop />}
            label="Equipamentos"
            submenuItems={[
              { label: "Notebooks" },
              { label: "Monitores" },
              { label: "Impressoras", path: "/impressora" },
              { label: "Cartuchos", path: "/cartucho" },
              { label: "Servidores" },
              { label: "Periféricos" },
            ]}
          />
        </nav>
      </aside>

      {/* Área principal */}
      <main className="main">
        <header className="main-header">
          <h1>Olá, Admin</h1>
          <button className="logout-btn" onClick={() => window.location.href = "/login"}>
            Sair
          </button>
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
