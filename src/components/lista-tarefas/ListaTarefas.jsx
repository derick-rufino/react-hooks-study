import { useState, useContext, useEffect } from "react";
import useCopyToClipboard from "../../utils/CopyToClipboard";
import { ToastContext } from "../../utils/ToastContext";

import "./ListaTarefas.css";

// Função utilitária para acessar localStorage com segurança
const getFromLocalStorage = (key, defaultValue) => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Erro ao acessar localStorage para a chave "${key}":`, error);
    return defaultValue;
  }
};

const setToLocalStorage = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(
      `Erro ao salvar no localStorage para a chave "${key}":`,
      error
    );
  }
};

export default function ListaTarefas() {
  const [tarefas, setTarefas] = useState(() => {
    return getFromLocalStorage("tarefasGuardadasLocais", []);
  });

  useEffect(() => {
    setToLocalStorage("tarefasGuardadasLocais", tarefas);
  }, [tarefas]);

  const [tarefaAtual, setTarefaAtual] = useState("");

  const [mensagemErro, setMensagemErro] = useState("");
  const { addToast } = useContext(ToastContext);
  const [, copyText] = useCopyToClipboard();

  const [searchboxOpen, setSearchboxOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchTermNormalizado = searchTerm.trim().toLowerCase();

  const tarefasVisiveis =
    searchboxOpen && searchTerm.trim() !== ""
      ? tarefas.filter((tarefa) =>
          tarefa.texto.toLowerCase().includes(searchTermNormalizado)
        )
      : tarefas;

  // Calcular contadores
  const tarefasPendentes = tarefas.filter((tarefa) => !tarefa.concluida).length;
  const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.concluida).length;

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
    setMensagemErro("");

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

  function toggleComplete(id, concluida) {
    if (!concluida) {
      addToast({ type: "success", message: "Tarefa concluída!" });
    }
    setTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
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
        <div className="header-listaTarefas">
            <h4 className="titulo-listaTarefas">Lista de Tarefas</h4>
          <div className="container-contadores">
            <div className="contador-pendentes">
              <span className="contador-numero">{tarefasPendentes}</span>
              Pendentes
            </div>
            <div className="contador-concluidas">
              <span className="contador-numero">{tarefasConcluidas}</span>
              Concluídas
            </div>
          </div>
        </div>

        <input
          type="text"
          name="task"
          id="nomeTarefa"
          value={tarefaAtual}
          onChange={(e) => {
            setTarefaAtual(e.target.value);
          }}
          autoComplete="off"
          placeholder="Digite sua tarefa"
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
      </form>
      <div className="list-actions">
        <div
          className={`filter-search-container ${
            searchboxOpen ? "animating-width" : ""
          }`}
        >
          <button
            type="button"
            className="filter-tasks"
            title={
              !searchboxOpen ? "Pesquisar tarefa" : "Fechar caixa de busca" //Cheio de concionais, mas to amando isso
            }
            onClick={() => setSearchboxOpen(!searchboxOpen)}
          >
            {!searchboxOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-list-search"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 15m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M18.5 18.5l2.5 2.5" />
                <path d="M4 6h16" />
                <path d="M4 12h4" />
                <path d="M4 18h4" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-x"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            )}
          </button>
          {searchboxOpen && (
            <input
              type="text"
              name="searchbox"
              id="searchbox"
              className="searchbox"
              autoFocus={true}
              autoComplete="task"
              placeholder="Procurar tarefa"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </div>
        <button
          type="button"
          className="clearAll-tasks"
          title="Apagar todas as tarefas"
          onClick={() => setTarefas([])} // seta como um array vazio mueheheh muto fácil (to até achando que tá errado)
        >
          <svg
            className="deleteAll"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--danger)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-trash-x"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7h16" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            <path d="M10 12l4 4m0 -4l-4 4" />
          </svg>
          Limpar tudo
        </button>
      </div>
      <ul className="lista-tarefas">
        {tarefasVisiveis.length !== 0 ? (
          tarefasVisiveis.map((tarefa) => (
            <li key={tarefa.id} className="item-tarefa" name="task">
              <div className="wrapper-paragrafo">
                {/* AI-ADDED START: checkbox controlado e ligação com toggleComplete (gerado por assistente) */}
                <input
                  type="checkbox"
                  className="checkbox-tarefa"
                  checked={tarefa.concluida}
                  onChange={() => toggleComplete(tarefa.id, tarefa.concluida)}
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
          ))
        ) : (
          <li className="item-tarefa empty-tarefa">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 smiley-svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
            Não há tarefas
          </li>
        )}
      </ul>
    </div>
  );
}
