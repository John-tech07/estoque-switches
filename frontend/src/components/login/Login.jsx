import React, { useState } from "react";
import { User, Lock, Archive } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      const msg = "Preencha email e senha.";
      setError(msg);
      alert(msg);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao realizar login");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));

      navigate("/inventory");
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="login-header">
          <Archive size={45} className="login-header-icon" />
          <h1>Acesso ao Estoque</h1>
          <p>Gerenciamento de Switches</p>
        </div>

        <div className="input-field">
          <User size={25} className="icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-field">
          <Lock size={25} className="icon" />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-field">
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>

        <div className="signup-link">
          <p>
            Não possui conta?{" "}
            <a onClick={() => navigate("/register")}>Cadastrar-se</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
