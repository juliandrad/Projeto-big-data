import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLaptop, FaCogs } from "react-icons/fa";
import "./Cartucho.css";

function Cartucho({ impressoras = [] }) {
  const [equipmentOpen, setEquipmentOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    modelo: "",
    tipo: "",
    marca: "",
    quantidade: 1,
    impressoraId: "",
  });

  const [cartuchos, setCartuchos] = useState([]);

  // Função para alterar campos do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Salvar cartucho
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
      usuarioRegistro: "Usuário Atual", // substituir pelo usuário logado
    };

    setCartuchos([...cartuchos, novoCartucho]);
    setFormData({
      modelo: "",
      tipo: "",
      marca: "",
      quantidade: 1,
      impressoraId: "",
    });
    alert("Cartucho cadastrado com sucesso!");
  };

  // Excluir cartucho
  const handleExcluir = (id) => {
    if (window.confirm("Deseja excluir este cartucho?")) {
      setCartuchos(cartuchos.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="container">
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
              <button>Periféricos</button>
            </div>
          )}
        </nav>
      </aside>

      <main className="main">
        <div className="cartucho-container">
          <header className="header">
            <h1>Cadastro de Cartuchos</h1>
          </header>

          <div className="form-container">
            <h2>Informações do Cartucho</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Modelo:
                <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} required />
              </label>

              <label>
                Tipo (Ex: Preto, Colorido):
                <input type="text" name="tipo" value={formData.tipo} onChange={handleChange} required />
              </label>

              <label>
                Marca:
                <input type="text" name="marca" value={formData.marca} onChange={handleChange} />
              </label>

              <label>
                Quantidade:
                <input type="number" name="quantidade" value={formData.quantidade} min={1} onChange={handleChange} />
              </label>

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

              <button type="submit">Salvar Cartucho</button>
            </form>
          </div>

          <div className="grid-cartuchos">
            <h2>Cartuchos Cadastrados</h2>
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
                        <button onClick={() => handleExcluir(c.id)}>Excluir</button>
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
