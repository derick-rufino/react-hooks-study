import { useState, useContext } from "react";
import useCopyToClipboard from "../../utils/CopyToClipboard";
import { ToastContext } from "../../utils/ToastContext";

import "./ListaTarefas.css";

export default function ListaTarefas() {
  const [horarioAtual, setHorarioAtual] = useState(new Date());
  const [tarefas, setTarefas] = useState(["Tarefa 1", "tarefa 2"]);

  const [tarefaAtual, setTarefaAtual] = useState("");

  const [mensagemErro, setMensagemErro] = useState("");
  const { addToast } = useContext(ToastContext);
  const [, copyText] = useCopyToClipboard();

  const handleSubmit = (e) => {
    e.preventDefault();
    const texto = tarefaAtual.trim();
    if (!texto) return;

    if (tarefas.includes(texto)) {
      setMensagemErro("Tarefa já existe");
      addToast({ type: "error", message: "Tarefa já existe" });
      return;
    }

    setTarefas((prevTarefas) => [...prevTarefas, texto]);
    setTarefaAtual("");
    addToast({
      type: "success",
      title: "Adicionada",
      message: `Tarefa adicionada: ${texto}`,
    });
  };

  function handleDelete(index, texto) {
    setTarefas((prev) => prev.filter((_, i) => i !== index));
    addToast({ type: "info", message: `Tarefa removida: ${texto}` });
  }

  async function handleCopy(texto) {
    const ok = await copyText(texto);
    if (ok)
      addToast({
        type: "success",
        message: "Texto copiado para a área de transferência",
      });
    else addToast({ type: "error", message: "Não foi possível copiar" });
  }
  return (
    <div className="container-lista-tarefas">
      <form onSubmit={handleSubmit} id="lista-tarefas-form">
        <h4 className="div-titulo">Lista de Tarefas</h4>
        <input
          type="text"
          name="task"
          id="nomeTarefa"
          value={tarefaAtual}
          onChange={(e) => {
            setTarefaAtual(e.target.value);
          }}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={tarefaAtual.trim() === "" || tarefas.includes(tarefaAtual)}
          className="submit-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 check-svg"
          >
            <path
              fillRule="evenodd"
              d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {mensagemErro !== "" && tarefas.includes(tarefaAtual) && (
          <p className="mensagem-erro">{mensagemErro}</p>
        )}
      </form>
      <ul className="lista-tarefas">
        {tarefas.map((tarefa, index) => (
          <li key={index} className="item-tarefa">
            <p className="texto-tarefa">{tarefa}</p>
            <div className="actions-container">
              <button
                className="copiar-texto tarefaAction"
                onClick={() => handleCopy(tarefa)}
                aria-label={`Copiar tarefa ${tarefa}`}
                title="Copiar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-copy"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
                  <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
                </svg>
              </button>
              <button
                className="apagarTarefa  tarefaAction"
                onClick={() => handleDelete(index, tarefa)}
                aria-label={`Apagar ${tarefa}`}
                title="Apagar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
