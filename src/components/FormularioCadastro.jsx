import { useState } from "react";
import "./FormularioCadastro.css";

export default function FormularioCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [nomeExibido, setNomeExibido] = useState("");
  const [emailExibido, setEmailExibido] = useState("");
  const [senhaExibida, setSenhaExibida] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setNomeExibido(nome);
    setEmailExibido(email);
    setSenhaExibida(senha);

    setNome("");
    setEmail("");
    setSenha("");
  };

  return (
    <div className="container-form">
      <form onSubmit={handleSubmit}>
        <h2>Cadastro</h2>

        <div className="form-group">
          <label htmlFor="nome">Nome completo</label>
          <input
            type="text"
            id="nome"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            placeholder="Mínimo 6 caracteres"
            minLength={6}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      <div className="output">
        <h3>Dados preenchidos:</h3>
        <p className="display">
          <strong>Nome:</strong>
          <span>{nomeExibido || "—"}</span>
        </p>
        <p className="display">
          <strong>E-mail:</strong>
          <span>{emailExibido || "—"}</span>
        </p>
        <p className="display">
          <strong>Senha:</strong>
          <span>{senhaExibida || "—"}</span>
        </p>
      </div>
    </div>
  );
}
