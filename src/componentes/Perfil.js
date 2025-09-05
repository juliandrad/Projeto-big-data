import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCogs, FaLaptop, FaBuilding, FaChartBar, FaUsers, FaServer, FaExclamationTriangle } from "react-icons/fa";
import "./Perfil.css";

function Perfil() {
  const navigate = useNavigate();

  // Dados do formulário de perfil
  const [formData, setFormData] = useState({
    id: null,
    nome: "",
    permissoes: [],
  });

  // Perfis existentes
  const [perfis, setPerfis] = useState([
    { id: 1, nome: "Admin", permissoes: ["Gerenciar Usuários", "Gerenciar Estoque", "Visualizar Relatórios", "Excluir Item", "Excluir Usuário"] },
    { id: 2, nome: "Usuário", permissoes: ["Visualizar Estoque", "Visualizar Relatórios", "Gerenciar Estoque"] },
  ]);

  // Permissões disponíveis
  const permissoesDisponiveis = [
    "Gerenciar Usuários",
    "Gerenciar Estoque",
    "Visualizar Relatórios",
    "Editar Perfil",
    "Visualizar Perfil",
    "Excluir Item",
    "Excluir Usuário",
  ];

  // Alterar nome do perfil
  const handleChangeNome = (e) => {
    setFormData({ ...formData, nome: e.target.value });
  };

  // Selecionar/deselecionar permissão
  const handleTogglePermissao = (perm) => {
    if (formData.permissoes.includes(perm)) {
      setFormData({
        ...formData,
        permissoes: formData.permissoes.filter((p) => p !== perm),
      });
    } else {
      setFormData({
        ...formData,
        permissoes: [...formData.permissoes, perm],
      });
    }
  };

  // Salvar perfil
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome) return alert("Informe o nome do perfil!");

    if (formData.id) {
      // Atualizar perfil existente
      setPerfis(perfis.map((p) => (p.id === formData.id ? formData : p)));
      alert("Perfil atualizado com sucesso!");
    } else {
      // Criar novo perfil
      const novoPerfil = {
        id: Date.now(),
        nome: formData.nome,
        permissoes: formData.permissoes,
      };
      setPerfis([...perfis, novoPerfil]);
      alert("Perfil cadastrado com sucesso!");
    }

    setFormData({ id: null, nome: "", permissoes: [] });
  };

  // Excluir perfil
  const handleExcluir = (id) => {
    if (window.confirm("Deseja excluir este perfil?")) {
      setPerfis(perfis.filter((p) => p.id !== id));
    }
  };

  // Editar perfil
  const handleEditar = (perfil) => {
    setFormData(perfil);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Componente de menu lateral
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

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">InvenTI</div>
        <nav>
          <SidebarMenu icon={<FaChartBar />} label="Início" submenuItems={[{ label: "Dashboard", path: "/home" }]} />
          <SidebarMenu icon={<FaCogs />} label="Configurações" submenuItems={[{ label: "Usuários", path: "/usuarios" }, { label: "Perfis", path: "/perfil" }]} />
          <SidebarMenu icon={<FaLaptop />} label="Equipamentos" submenuItems={[
            { label: "Computadores", path: "/notedesk" },
            { label: "Monitores" },
            { label: "Impressoras", path: "/impressora" },
            { label: "Cartuchos", path: "/cartucho" },
          ]} />
        </nav>
      </aside>

      {/* Área principal */}
      <main className="main">
        <header className="main-header">
          <h1>Cadastre e consulte: Perfil de acesso</h1>
          <button className="logout-btn" onClick={() => navigate("/login")}>
            Sair
          </button>
        </header>

        {/* Formulário */}
        <section className="form-section">
          <form className="perfil-form" onSubmit={handleSubmit}>
            <label>
              Nome do Perfil:
              <input
                type="text"
                name="nome"
                placeholder="Ex: Admin"
                value={formData.nome}
                onChange={handleChangeNome}
                required
              />
            </label>

            <label>Permissões:</label>
            <div className="permissoes-grid">
              {permissoesDisponiveis.map((perm) => (
                <div
                  key={perm}
                  className={`perm-item ${
                    formData.permissoes.includes(perm) ? "selecionado" : ""
                  }`}
                  onClick={() => handleTogglePermissao(perm)}
                >
                  {perm}
                </div>
              ))}
            </div>

            <button type="submit" className="submit-btn">
              {formData.id ? "Salvar Alterações" : "Cadastrar Perfil"}
            </button>
          </form>
        </section>

        {/* Grid de perfis */}
        <section className="grid-section">
          <h2>Perfis Existentes</h2>
          <table className="perfis-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Permissões</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {perfis.map((perfil) => (
                <tr key={perfil.id}>
                  <td>{perfil.nome}</td>
                  <td>{perfil.permissoes.join(", ")}</td>
                  <td>
                    <button
                      className="editar"
                      onClick={() => handleEditar(perfil)}
                    >
                      Editar
                    </button>
                    <button
                      className="excluir"
                      onClick={() => handleExcluir(perfil.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default Perfil;
