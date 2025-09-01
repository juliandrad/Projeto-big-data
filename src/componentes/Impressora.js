import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLaptop, FaCogs } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import "./Impressora.css";

function Impressora() {
  const [equipmentOpen, setEquipmentOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
    const nova = { id: Date.now(), ...formData };
    setImpressoras([...impressoras, nova]);
    setFormData({
      modelo: "",
      marca: "",
      numeroSerie: "",
      patrimonio: "",
      localizacao: "",
      observacao: "",
      status: "Ativa",
    });
    alert("Impressora cadastrada com sucesso!");
  };

  const handleGerarQr = (impressora) => {
    setQrImpressora(impressora);
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
        <div className="impressora-container">
          <header className="header">
            <h1>Cadastro de Impressoras</h1>
          </header>

          {/* Formulário */}
          <div className="form-container">
            <h2>Informações da Impressora</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Modelo:
                <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} required />
              </label>
              <label>
                Marca:
                <input type="text" name="marca" value={formData.marca} onChange={handleChange} />
              </label>
              <label>
                Nº de Série:
                <input type="text" name="numeroSerie" value={formData.numeroSerie} onChange={handleChange} required />
              </label>
              <label>
                Patrimônio:
                <input type="text" name="patrimonio" value={formData.patrimonio} onChange={handleChange} />
              </label>
              <label>
                Localização:
                <input type="text" name="localizacao" value={formData.localizacao} onChange={handleChange} />
              </label>
              <label>
                Status:
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Ativa">Ativa</option>
                  <option value="Em Manutenção">Em Manutenção</option>
                  <option value="Inativa">Inativa</option>
                </select>
              </label>
              <label>
                Observação:
                <input type="text" name="observacao" value={formData.observacao} onChange={handleChange} />
              </label>
              <button type="submit">Salvar Impressora</button>
            </form>
          </div>

          {/* Grid de impressoras */}
          <div className="grid-impressoras">
            <h2>Impressoras Cadastradas</h2>
            <table>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Exibir QR Code */}
          {qrImpressora && (
            <div className="qr-container">
              <h3>QR Code da Impressora: {qrImpressora.modelo}</h3>
              <QRCodeSVG
                value={JSON.stringify(qrImpressora)}
                size={180}
                level="H"
                includeMargin={true}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Impressora;
