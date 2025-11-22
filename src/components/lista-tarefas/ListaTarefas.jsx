import { useState, useContext } from "react";
import useCopyToClipboard from "../../utils/CopyToClipboard";
import { ToastContext } from "../../utils/ToastContext";

import "./ListaTarefas.css";

export default function ListaTarefas() {
  const [tarefas, setTarefas] = useState([]);

  const [tarefaAtual, setTarefaAtual] = useState("");

  const [mensagemErro, setMensagemErro] = useState("");
  const { addToast } = useContext(ToastContext);
  const [, copyText] = useCopyToClipboard();

  const handleSubmit = (e) => {
    e.preventDefault();
    const texto = tarefaAtual.trim();
    if (!texto) return;

    const tarefaExiste = tarefas.some(
      (tarefa) => tarefa.texto.toLowerCase() === texto.toLowerCase()
    );

    if (tarefaExiste) {
      setMensagemErro("Tarefa já existe");
      addToast({ type: "error", message: "Tarefa já existe" });
      return;
    }

    const novaTarefa = {
      id: Date.now(),
      texto,
      concluida: false,
      criadoEm: new Date().toISOString(),
    };

    setTarefas((prevTarefas) => [novaTarefa, ...prevTarefas]);
    setTarefaAtual("");

    addToast({
      type: "success",
      title: "Adicionada",
      message: `Tarefa adicionada: ${texto}`,
    });
  };

  function handleDelete(id) {
    /* AI-ADDED START: handler para remover tarefa por id (gerado por assistente) */
    setTarefas((prev) => prev.filter((tarefa) => tarefa.id !== id));
    addToast({ type: "info", message: `Tarefa removida` });
    /* AI-ADDED END */
  }

  function toggleComplete(id) {
    /* AI-ADDED START: handler para alternar propriedade `concluida` (gerado por assistente) */
    setTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
    /* AI-ADDED END */
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
          disabled={tarefaAtual === ""}
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
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className="item-tarefa">
            <div className="wrapper-paragrafo">
              {/* AI-ADDED START: checkbox controlado e ligação com toggleComplete (gerado por assistente) */}
              <input
                type="checkbox"
                className="checkbox-tarefa"
                checked={!tarefa.concluida}
                onChange={() => toggleComplete(tarefa.id)}
                aria-label={`Marcar tarefa ${tarefa.texto} como concluída`}
              />
              {/* AI-ADDED END */}
              <p
                className={`texto-tarefa ${
                  tarefa.concluida ? "concluida" : ""
                }`}
              >
                {tarefa.texto}
              </p>
            </div>
            <div className="actions-container">
              {/* AI-ADDED START: botão de copiar com tipo button (gerado por assistente) */}
              <button
                type="button"
                className="copiar-texto tarefaAction"
                onClick={() => handleCopy(tarefa.texto)}
                aria-label={`Copiar tarefa ${tarefa.texto}`}
                title="Copiar"
              >
                {/* AI-ADDED END */}
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
              {/* AI-ADDED START: botão de apagar com type=button (gerado por assistente) */}
              <button
                type="button"
                className="apagarTarefa  tarefaAction"
                onClick={() => handleDelete(tarefa.id, tarefa.texto)}
                aria-label={`Apagar ${tarefa.texto}`}
                title="Apagar"
              >
                {/* AI-ADDED END */}
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
