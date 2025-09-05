import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCogs, FaLaptop, FaChartBar } from "react-icons/fa";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Cartucho.css";

function Cartucho({ impressoras = [] }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    modelo: "",
    tipo: "",
    marca: "",
    quantidade: 1,
    impressoraId: "",
    limiteMinimo: "",
  });

  const [cartuchos, setCartuchos] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.modelo || !formData.tipo || !formData.impressoraId) {
      return alert("Preencha todos os campos obrigatórios!");
    }

    const now = new Date();
    const novoCartucho = {
      id: Date.now(),
      ...formData,
      dataRegistro: now.toLocaleDateString(),
      horaRegistro: now.toLocaleTimeString(),
      usuarioRegistro: "Usuário Atual",
    };

    setCartuchos([...cartuchos, novoCartucho]);
    setFormData({
      modelo: "",
      tipo: "",
      marca: "",
      quantidade: 1,
      impressoraId: "",
      limiteMinimo: "",
    });
    alert("Cartucho cadastrado com sucesso!");
  };

  const handleExcluir = (id) => {
    if (window.confirm("Deseja excluir este cartucho?")) {
      setCartuchos(cartuchos.filter((c) => c.id !== id));
    }
  };

  // Exportar Excel
  const exportExcel = () => {
    const data = cartuchos.map((c) => {
      const impressora = impressoras.find((i) => i.id === c.impressoraId);
      return {
        Modelo: c.modelo,
        Tipo: c.tipo,
        Quantidade: c.quantidade,
        Impressora: impressora ? impressora.modelo : "N/A",
        Data: c.dataRegistro,
        Hora: c.horaRegistro,
        Usuário: c.usuarioRegistro,
      };
    });
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cartuchos");
    XLSX.writeFile(wb, "cartuchos.xlsx");
  };

  // Exportar PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Cartuchos Cadastrados", 14, 16);
    const tableColumn = ["Modelo", "Tipo", "Quantidade", "Impressora", "Data", "Hora", "Usuário"];
    const tableRows = [];

    cartuchos.forEach((c) => {
      const impressora = impressoras.find((i) => i.id === c.impressoraId);
      tableRows.push([
        c.modelo,
        c.tipo,
        c.quantidade,
        impressora ? impressora.modelo : "N/A",
        c.dataRegistro,
        c.horaRegistro,
        c.usuarioRegistro,
      ]);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("cartuchos.pdf");
  };

  function SidebarMenu({ icon, label, submenuItems }) {
    const [open, setOpen] = useState(false);

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
        <div className="main-header">
          <h1>Cadastre e consulte: Cartucho</h1>
          <button className="logout-btn" onClick={() => navigate("/login")}>
            Sair
          </button>
        </div>

        <div className="cartucho-container">
          {/* Formulário */}
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  Modelo:
                  <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} required />
                </label>
                <label>
                  Tipo:
                  <select name="tipo" value={formData.tipo} onChange={handleChange} required>
                    <option value="">Selecione o tipo</option>
                    <option value="Amarelo">Amarelo</option>
                    <option value="Ciano">Ciano</option>
                    <option value="Magenta">Magenta</option>
                    <option value="Preto">Preto</option>
                    <option value="Colorido">Colorido</option>
                  </select>
                </label>
              </div>

              <div className="form-row">
                <label>
                  Marca do Cartucho/Toner:
                  <select name="marca" value={formData.marca} onChange={handleChange}>
                    <option value="">Selecione a marca</option>
                    <option value="HP">HP</option>
                    <option value="Canon">Canon</option>
                    <option value="Epson">Epson</option>
                    <option value="Brother">Brother</option>
                    <option value="Chinamate">Chinamate</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Evolut">Evolut</option>
                  </select>
                </label>

                <label>
                  Quantidade:
                  <input type="number" name="quantidade" min={1} value={formData.quantidade} onChange={handleChange} />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Impressora:
                  <select name="impressoraId" value={formData.impressoraId} onChange={handleChange} required>
                    <option value="">Selecione a impressora</option>
                    {impressoras.map((imp) => (
                      <option key={imp.id} value={imp.id}>
                        {imp.modelo} ({imp.marca})
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Limite mínimo de estoque:
                  <select name="limiteMinimo" value={formData.limiteMinimo} onChange={handleChange}>
                    <option value="">Selecione o limite</option>
                    {[1, 5, 10, 15, 20].map((valor) => (
                      <option key={valor} value={valor}>
                        {valor}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button type="submit">Salvar Cartucho</button>
            </form>
          </div>

          <div className="grid-row"></div>
          {/* Grid de cartuchos */}
          <div className="grid-cartuchos">
            <div className="grid-header">
              <h2>Cartuchos Cadastrados</h2>
              <div className="export-buttons">
                <button onClick={exportExcel}>Exportar Excel</button>
                <button onClick={exportPDF}>Exportar PDF</button>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Modelo</th>
                  <th>Tipo</th>
                  <th>Quantidade</th>
                  <th>Impressora</th>
                  <th>Data</th>
                  <th>Hora</th>
                  <th>Usuário</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {cartuchos.map((c) => {
                  const impressora = impressoras.find((i) => i.id === c.impressoraId);
                  return (
                    <tr key={c.id}>
                      <td>{c.modelo}</td>
                      <td>{c.tipo}</td>
                      <td>{c.quantidade}</td>
                      <td>{impressora ? impressora.modelo : "Impressora não encontrada"}</td>
                      <td>{c.dataRegistro}</td>
                      <td>{c.horaRegistro}</td>
                      <td>{c.usuarioRegistro}</td>
                      <td>
                        <button className="excluir" onClick={() => handleExcluir(c.id)}>
                          Excluir
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cartucho;
