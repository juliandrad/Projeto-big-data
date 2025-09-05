import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCogs, FaLaptop, FaChartBar } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./NoteDesk.css"; // Certifique-se de ter renomeado o CSS

function NoteDesk() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: null,
    tipo: "",
    marca: "",
    numeroSerie: "",
    patrimonio: "",
    localizacao: "",
    sistemaOperacional: "",
    usuario: "",
    departamento: "",
    ultimaManutencao: "",
    status: "Ativo",
    observacao: "",
  });

  const [equipamentos, setEquipamentos] = useState([]);
  const [qrEquipamento, setQrEquipamento] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.tipo || !formData.numeroSerie) {
      return alert("Preencha ao menos Tipo e Número de Série!");
    }

    if (formData.id) {
      setEquipamentos(
        equipamentos.map((eq) => (eq.id === formData.id ? formData : eq))
      );
      alert("Equipamento atualizado com sucesso!");
    } else {
      setEquipamentos([...equipamentos, { id: Date.now(), ...formData }]);
      alert("Equipamento cadastrado com sucesso!");
    }

    setFormData({
      id: null,
      tipo: "",
      marca: "",
      numeroSerie: "",
      patrimonio: "",
      localizacao: "",
      sistemaOperacional: "",
      usuario: "",
      departamento: "",
      ultimaManutencao: "",
      status: "Ativo",
      observacao: "",
    });
  };

  const exportExcel = () => {
    const data = equipamentos.map((eq) => ({
      Tipo: eq.tipo,
      Marca: eq.marca,
      "Nº de Serie": eq.numeroSerie,
      Patrimonio: eq.patrimonio,
      Localizacao: eq.localizacao || "N/A",
      "Sistema Operacional": eq.sistemaOperacional,
      Usuario: eq.usuario,
      Departamento: eq.departamento,
      "Última Manutenção": eq.ultimaManutencao,
      Status: eq.status,
      Observacao: eq.observacao || "",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Equipamentos");
    XLSX.writeFile(wb, "equipamentos.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Equipamentos Cadastrados", 14, 16);
    const tableColumn = [
      "Tipo",
      "Marca",
      "Nº de Serie",
      "Patrimonio",
      "Localizacao",
      "Sistema Operacional",
      "Usuario",
      "Departamento",
      "Última Manutenção",
      "Status",
      "Observacao",
    ];
    const tableRows = equipamentos.map((eq) => [
      eq.tipo,
      eq.marca,
      eq.numeroSerie,
      eq.patrimonio,
      eq.localizacao || "N/A",
      eq.sistemaOperacional,
      eq.usuario,
      eq.departamento,
      eq.ultimaManutencao,
      eq.status,
      eq.observacao || "",
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("equipamentos.pdf");
  };

  const handleGerarQr = (equipamento) => setQrEquipamento(equipamento);
  const handleExcluir = (id) =>
    window.confirm("Deseja realmente excluir este item?") &&
    setEquipamentos(equipamentos.filter((eq) => eq.id !== id));

  function SidebarMenu({ icon, label, submenuItems }) {
    const [open, setOpen] = useState(false);
    const handleClick = (item) => item.path ? navigate(item.path) : item.action && item.action();
    return (
      <div className="menu-item">
        <button className="menu-button" onClick={() => setOpen(!open)}>
          {icon} <span>{label}</span>
          {submenuItems && <span className="arrow">{open ? "▲" : "▼"}</span>}
        </button>
        {open && submenuItems && (
          <div className="submenu">
            {submenuItems.map((item, idx) => (
              <button key={idx} onClick={() => handleClick(item)}>{item.label}</button>
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

      <main className="main">
        <header className="main-header">
          <h1>Cadastre e consulte: NoteDesk</h1>
          <button className="logout-btn" onClick={() => navigate("/login")}>Sair</button>
        </header>

        <section className="form-section">
          <form className="notedesk-form" onSubmit={handleSubmit}>
            <label>Tipo:
              <select name="tipo" value={formData.tipo} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="Notebook">Notebook</option>
                <option value="Computador">Computador</option>
                <option value="Computador">tablet</option>
                <option value="Computador">ChromeBook</option>
              </select>
            </label>
            <label>Marca:
              <select name="marca" value={formData.marca} onChange={handleChange}>
                <option value="">Selecione a marca</option>
                <option value="HP">HP</option>
                <option value="Dell">Dell</option>
                <option value="Lenovo">Lenovo</option>
                <option value="Acer">Acer</option>
                <option value="Samsung">Samsung</option>
                <option value="Asus">Asus</option>
              </select>
            </label>
            <label>Nº de Série:<input type="text" name="numeroSerie" value={formData.numeroSerie} onChange={handleChange} required /></label>
            <label>Patrimônio:<input type="text" name="patrimonio" value={formData.patrimonio} onChange={handleChange} /></label>
            <label>Localização:<input type="text" name="localizacao" value={formData.localizacao} onChange={handleChange} /></label>
            <label>Sistema Operacional:<input type="text" name="sistemaOperacional" value={formData.sistemaOperacional} onChange={handleChange} /></label>
            <label>Usuário:<input type="text" name="usuario" value={formData.usuario} onChange={handleChange} /></label>
            <label>Departamento:<input type="text" name="departamento" value={formData.departamento} onChange={handleChange} /></label>
            <label>Última Manutenção:<input type="date" name="ultimaManutencao" value={formData.ultimaManutencao} onChange={handleChange} /></label>
            <label>Status:
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Ativo">Ativo</option>
                <option value="Em Manutenção">Em Manutenção</option>
                <option value="Inativo">Inativo</option>
              </select>
            </label>
            <label>Observação:<input type="text" name="observacao" value={formData.observacao} onChange={handleChange} /></label>
            <button type="submit" className="submit-btn">{formData.id ? "Salvar Alterações" : "Cadastrar"}</button>
          </form>
        </section>

        <section className="grid-section">
          <div className="grid-header">
            <h2>Equipamentos Cadastrados</h2>
            <div className="export-buttons">
              <button onClick={exportExcel}>Exportar Excel</button>
              <button onClick={exportPDF}>Exportar PDF</button>
            </div>
          </div>
          <table className="notedesk-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Marca</th>
                <th>Nº Série</th>
                <th>Patrimônio</th>
                <th>Localização</th>
                <th>S.O.</th>
                <th>Usuário</th>
                <th>Depto</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {equipamentos.map((eq) => (
                <tr key={eq.id}>
                  <td>{eq.tipo}</td>
                  <td>{eq.marca}</td>
                  <td>{eq.numeroSerie}</td>
                  <td>{eq.patrimonio}</td>
                  <td>{eq.localizacao}</td>
                  <td>{eq.sistemaOperacional}</td>
                  <td>{eq.usuario}</td>
                  <td>{eq.departamento}</td>
                  <td>{eq.status}</td>
                  <td>
                    <button onClick={() => handleGerarQr(eq)}>QR Code</button>
                    <button className="excluir" onClick={() => handleExcluir(eq.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {qrEquipamento && (
          <section className="qr-section">
            <h3>QR Code do Equipamento: {qrEquipamento.tipo}</h3>
            <QRCodeSVG value={JSON.stringify(qrEquipamento)} size={180} level="H" includeMargin={true} />
          </section>
        )}
      </main>
    </div>
  );
}

export default NoteDesk;
