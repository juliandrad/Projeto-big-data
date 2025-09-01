import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaLaptop, FaCogs } from "react-icons/fa";
import "./Perfil.css";

function Perfil() {
  const [equipmentOpen, setEquipmentOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const navigate = useNavigate();

  // Dados do formulário de perfil
  const [formData, setFormData] = useState({
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
        permissoes: formData.permissoes.filter((p) => p !== perm) 
      });
    } else {
      setFormData({ 
        ...formData, 
        permissoes: [...formData.permissoes, perm] 
      });
    }
  };

  // Salvar perfil
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome) return alert("Informe o nome do perfil!");
    const novoPerfil = {
      id: Date.now(),
      nome: formData.nome,
      permissoes: formData.permissoes,
    };
    setPerfis([...perfis, novoPerfil]);
    setFormData({ nome: "", permissoes: [] });
    alert("Perfil cadastrado com sucesso!");
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
        <div className="perfil-container">
          <header className="header">
            <h1>Cadastro de Perfil</h1>
          </header>

          {/* Formulário de perfil */}
          <div className="form-container">
            <h2>Informações do Perfil</h2>
            <form onSubmit={handleSubmit}>
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
                    className={`perm-item ${formData.permissoes.includes(perm) ? "selecionado" : ""}`}
                    onClick={() => handleTogglePermissao(perm)}
                  >
                    {perm}
                  </div>
                ))}
              </div>

              <button type="submit">Salvar Perfil</button>
            </form>
          </div>

          {/* Grid de perfis existentes */}
          <div className="grid-perfis">
            <h2>Perfis Existentes</h2>
            <table>
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
                      <button className="editar" onClick={() => handleEditar(perfil)}>Editar</button>
                      <button className="excluir" onClick={() => handleExcluir(perfil.id)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Perfil;
