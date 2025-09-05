import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCogs, FaLaptop, FaChartBar } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Usuario.css";

function Usuario() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: null,
    nome: "",
    email: "",
    departamento: "",
    perfil: "",
  });

  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: "João Silva", email: "joao@empresa.com", departamento: "TI", perfil: "Admin" },
    { id: 2, nome: "Maria Santos", email: "maria@empresa.com", departamento: "Financeiro", perfil: "Usuário" },
  ]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setUsuarios(usuarios.map((u) => (u.id === formData.id ? formData : u)));
      alert("Usuário atualizado com sucesso!");
    } else {
      const novoUsuario = { id: Date.now(), ...formData };
      setUsuarios([...usuarios, novoUsuario]);
      alert("Usuário cadastrado com sucesso!");
    }
    setFormData({ id: null, nome: "", email: "", departamento: "", perfil: "" });
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

  const exportToExcel = (data, fileName = "relatorio.xlsx") => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
  };

  const exportToPDF = (data, fileName = "relatorio.pdf") => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [Object.keys(data[0] || {})],
      body: data.map((row) => Object.values(row)),
    });
    doc.save(fileName);
  };

  // Menu lateral
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
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">InvenTI</div>
        <nav>
          <SidebarMenu icon={<FaChartBar />} label="Início" path="/home"
            submenuItems={[{ label: "Dashboard", path: "/home" }]}
          />
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
          <h1>Cadastre e consulte: Usuário</h1>
          <button className="logout-btn" onClick={() => navigate("/login")}>
            Sair
          </button>
        </header>

        {/* Formulário */}
        <section className="form-section">
          <form className="usuario-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Nome:
                <input
                  type="text"
                  name="nome"
                  placeholder="Digite o nome completo"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                E-mail:
                <input
                  type="email"
                  name="email"
                  placeholder="exemplo@empresa.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Departamento:
                <select
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                >
                  <option value="">Selecione o departamento</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="Recursos Humanos">RH</option>
                  <option value="TI">TI</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Compras">Compras</option>
                  <option value="Jurídico">Jurídico</option>
                  <option value="Produção">Operacional</option>
                  <option value="Central Maricá">Central Maricá</option>
                  <option value="Central Guapimirim">Central Guapimirim</option>
                  <option value="Central Saquarema">Central Saquarema</option>
                  <option value="Central Arraial do Cabo">Central Arraial do Cabo</option>
                  <option value="Conexão Universitária">Conexão Universitária - Saquarema</option>
                </select>
              </label>
              <label>
                Perfil:
                <select
                  name="perfil"
                  value={formData.perfil}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione um perfil</option>
                  <option value="Admin">Admin</option>
                  <option value="Usuário">Usuário</option>
                </select>
              </label>
            </div>

            <button type="submit" className="submit-btn">
              {formData.id ? "Salvar Alterações" : "Cadastrar Usuário"}
            </button>
          </form>
        </section>

        {/* Grid de usuários */}
        <section className="grid-section">
          <h2>Usuários Cadastrados</h2>

          <table className="usuarios-table">
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
        </section>
      </main>
    </div>
  );
}

export default Usuario;
