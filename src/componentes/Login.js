import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../img/logo_mollitiam.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui você pode validar login com backend
    console.log("Login:", { email, senha });

    // Redireciona para Home
    navigate("/home");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Logo */}
        <img 
          src={logo} 
          alt="Logo Instituto Mollitiam" 
          className="login-logo" 
        />

        <h2>InvenTI</h2>
          <h3>Sistema de Gerenciamento de Estoque de TI</h3>

        <label>Email</label>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Senha</label>
        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
