import { useState, useEffect } from "react";

import "./ListaTarefas.css";

export default function ListaTarefas() {
  const [horarioAtual, setHorarioAtual] = useState(new Date());
  const [tarefas, setTarefas] = useState(["Tarefa 1", "tarefa 2"]);

  const [tarefaAtual, setTarefaAtual] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setTarefas((prevTarefas) => [...prevTarefas, tarefaAtual]);

    setTarefaAtual("");
  };

  return (
    <div className="container-lista-tarefas">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          id="nomeTarefa"
          value={tarefaAtual}
          onChange={(e) => {
            setTarefaAtual(e.target.value);
          }}
        />
        <button type="submit" disabled={tarefaAtual === ""}>
          Adicionar
        </button>
      </form>
      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>{tarefa}</li>
        ))}
      </ul>
    </div>
  );
}
