import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCogs, FaLaptop, FaBuilding, FaChartBar, FaUsers, FaServer, FaExclamationTriangle } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Impressora.css";

function Impressora() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: null,
    modelo: "",
    marca: "",
    numeroSerie: "",
    patrimonio: "",
    localizacao: "",
    observacao: "",
    status: "Ativa",
  });

  const [impressoras, setImpressoras] = useState([]);
  const [qrImpressora, setQrImpressora] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.modelo || !formData.numeroSerie) {
      return alert("Preencha ao menos Modelo e Número de Série!");
    }

    if (formData.id) {
      // Atualizar impressora existente
      setImpressoras(
        impressoras.map((imp) => (imp.id === formData.id ? formData : imp))
      );
      alert("Impressora atualizada com sucesso!");
    } else {
      const nova = { id: Date.now(), ...formData };
      setImpressoras([...impressoras, nova]);
      alert("Impressora cadastrada com sucesso!");
    }

    setFormData({
      id: null,
      modelo: "",
      marca: "",
      numeroSerie: "",
      patrimonio: "",
      localizacao: "",
      observacao: "",
      status: "Ativa",
    });
  };

  // Exportar Excel de Impressoras
const exportExcelImpressoras = () => {
  const data = impressoras.map((i) => {
    return {
      Modelo: i.modelo,
      Marca: i.marca,
      "Nº de Serie": i.numeroSerie,
      Patrimonio: i.patrimonio,
      Localizacao: i.localizacao || "N/A",
      Status: i.status,
      Observacao: i.observacao || "",
    };
  });

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Impressoras");
  XLSX.writeFile(wb, "impressoras.xlsx");
};

// Exportar PDF de Impressoras
const exportPDFImpressoras = () => {
  const doc = new jsPDF();
  doc.text("Impressoras Cadastradas", 14, 16);

  const tableColumn = ["Modelo", "Marca", "Nº de Serie", "Patrimonio", "Localizacao", "Status", "Observacao"];
  const tableRows = [];

  impressoras.forEach((i) => {
    tableRows.push([
      i.modelo,
      i.marca,
      i.numeroSerie,
      i.patrimonio,
      i.localizacao || "N/A",
      i.status,
      i.observacao || "",
    ]);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.save("impressoras.pdf");
};

  const handleGerarQr = (impressora) => {
    setQrImpressora(impressora);
  };
  const handleExcluir = (id) => {
  if (window.confirm("Deseja realmente excluir este item?")) {
    setImpressoras(impressoras.filter((imp) => imp.id !== id));
  }
  };
  // Sidebar menu
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
        <header className="main-header">
          <h1>Cadastre e consulte: Impressora</h1>
          <button className="logout-btn" onClick={() => navigate("/login")}>
            Sair
          </button>
        </header>

        {/* Formulário */}
        <section className="form-section">
          <form className="impressora-form" onSubmit={handleSubmit}>
            <label>
              Modelo:
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                required
              />
            </label>
                             <label>
                    Marca:
                    <select
                      name="marca"
                      value={formData.marca}
                      onChange={handleChange}
                    >
                      <option value="">Selecione a marca</option>
                      <option value="HP">HP</option>
                      <option value="Canon">Canon</option>
                      <option value="Epson">Epson</option>
                      <option value="Brother">Brother</option>
                      <option value="Lexmark">Lexmark</option>
                      <option value="Samsung">Samsung</option>
                      <option value="Xerox">Xerox</option>
                      <option value="Dell">Dell</option>
                      <option value="Ricoh">Ricoh</option>
                      <option value="Panasonic">Panasonic</option>
                      <option value="Kyocera">Kyocera</option>
                      <option value="OKI">OKI</option>
                      <option value="Sharp">Sharp</option>
                      <option value="Konica Minolta">Konica Minolta</option>
                      <option value="Toshiba">Toshiba</option>
                    </select>
                  </label>
            <label>
              Nº de Série:
              <input
                type="text"
                name="numeroSerie"
                value={formData.numeroSerie}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Patrimônio:
              <input
                type="text"
                name="patrimonio"
                value={formData.patrimonio}
                onChange={handleChange}
              />
            </label>
            <label>
              Localização:
              <input
                type="text"
                name="localizacao"
                value={formData.localizacao}
                onChange={handleChange}
              />
            </label>
            <label>
              Status:
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Ativa">Ativa</option>
                <option value="Em Manutenção">Em Manutenção</option>
                <option value="Inativa">Em estoque</option>
              </select>
            </label>
            <label>
              Observação:
              <input
                type="text"
                name="observacao"
                value={formData.observacao}
                onChange={handleChange}
              />
            </label>

            <button type="submit" className="submit-btn">
              {formData.id ? "Salvar Alterações" : "Cadastrar Impressora"}
            </button>
          </form>
        </section>

        {/*grid de informações*/}
                        <section className="grid-section">
              <div className="grid-header">
                <h2>Impressoras Cadastradas</h2>
                <div className="export-buttons">
                  <button onClick={exportExcelImpressoras}>Exportar Excel</button>
                  <button onClick={exportPDFImpressoras}>Exportar PDF</button>
                </div>
              </div>

              <table className="impressoras-table">
                <thead>
                  <tr>
                    <th>Modelo</th>
                    <th>Marca</th>
                    <th>Nº Série</th>
                    <th>Patrimônio</th>
                    <th>Localização</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {impressoras.map((imp) => (
                    <tr key={imp.id}>
                      <td>{imp.modelo}</td>
                      <td>{imp.marca}</td>
                      <td>{imp.numeroSerie}</td>
                      <td>{imp.patrimonio}</td>
                      <td>{imp.localizacao}</td>
                      <td>{imp.status}</td>
                      <td>
                        <button onClick={() => handleGerarQr(imp)}>Gerar QR Code</button>
                        <button className="excluir" onClick={() => handleExcluir(imp.id)}>
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>



        {/* QR Code */}
        {qrImpressora && (
          <section className="qr-section">
            <h3>QR Code da Impressora: {qrImpressora.modelo}</h3>
            <QRCodeSVG
              value={JSON.stringify(qrImpressora)}
              size={180}
              level="H"
              includeMargin={true}
            />
          </section>
        )}
      </main>
    </div>
  );
}

export default Impressora;
