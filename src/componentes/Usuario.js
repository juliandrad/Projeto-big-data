import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLaptop, FaCogs } from "react-icons/fa";
import "./Usuario.css";

function Usuario() {
  const navigate = useNavigate(); // <--- Adicionado aqui

  const [equipmentOpen, setEquipmentOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    departamento: "",
    perfil: "",
  });

  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: "João Silva", email: "joao@empresa.com", departamento: "TI", perfil: "Admin" },
    { id: 2, nome: "Maria Santos", email: "maria@empresa.com", departamento: "Financeiro", perfil: "Usuário" },
  ]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoUsuario = { id: Date.now(), ...formData };
    setUsuarios([...usuarios, novoUsuario]);
    alert("Usuário cadastrado com sucesso!");
    setFormData({ nome: "", email: "", departamento: "", perfil: "" });
  };

  const handleExcluir = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsuarios(usuarios.filter((u) => u.id !== id));
    }
  };

  const handleEditar = (usuario) => {
    setFormData(usuario);
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
        <div className="usuario-container">
          <header className="header">
            <h1>Cadastro de Usuário</h1>
          </header>

          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <label>
                Nome:
                <input type="text" name="nome" placeholder="Digite o nome completo" value={formData.nome} onChange={handleChange} required />
              </label>

              <label>
                E-mail:
                <input type="email" name="email" placeholder="exemplo@empresa.com" value={formData.email} onChange={handleChange} required />
              </label>

              <label>
                Departamento:
                <input type="text" name="departamento" placeholder="Departamento do usuário" value={formData.departamento} onChange={handleChange} />
              </label>

              <label>
                Perfil:
                <select name="perfil" value={formData.perfil} onChange={handleChange} required>
                  <option value="">Selecione um perfil</option>
                  <option value="Admin">Admin</option>
                  <option value="Usuário">Usuário</option>
                </select>
              </label>

              <button type="submit">Cadastrar Usuário</button>
            </form>
          </div>

          {/* Grid de usuários */}
          <div className="grid-usuarios">
            <h2>Usuários Cadastrados</h2>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Departamento</th>
                  <th>Perfil</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.departamento}</td>
                    <td>{usuario.perfil}</td>
                    <td>
                      <button className="editar" onClick={() => handleEditar(usuario)}>Editar</button>
                      <button className="excluir" onClick={() => handleExcluir(usuario.id)}>Excluir</button>
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

export default Usuario;
