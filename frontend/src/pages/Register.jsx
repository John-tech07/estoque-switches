import { UserPlus, MailPlus, LockKeyhole, Archive } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      alert("Preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao cadastrar usuário");
        setLoading(false);
        return;
      }

      alert("Usuário cadastrado com sucesso!");
      navigate("/");
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
          <h1>Criar Conta</h1>
          <p>Novo no Gerenciador de Switches?</p>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="input-field">
          <UserPlus size={25} className="icon" />
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-field">
          <MailPlus size={25} className="icon" />
          <input
            type="email"
            placeholder="Email institucional"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-field">
          <LockKeyhole size={25} className="icon" />
          <input
            type="password"
            placeholder="Crie uma senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="button-field">
          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>

        <div className="signup-link">
          <p>
            Já possui conta? <a onClick={() => navigate("/")}>Entrar</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
