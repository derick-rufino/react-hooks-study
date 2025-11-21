import { useState, useEffect } from "react";

import "./relogio.css";

export default function Relogio() {
  const [horarioAtual, setHorarioAtual] = useState(new Date()); // Pega o horário atual da pagina quando ela é aberta e armazena em horarioAtual
  const [estaCorrendo, setEstaCorrendo] = useState(true);
  useEffect(() => {
    // useEffect para colaterais
    if (estaCorrendo) {
      // Adicionada uma verificação do estado atual: se estaCorrendo for true, então ele gera um novo timer e limpa o antigo ali embaixo no return
      const id = setInterval(() => {
        // Define um novo timer que atualiza a cada 1 segundo e o nome dele é id
        setHorarioAtual(new Date()); // define o horarioAtual como uma nova data a cada 1 segundo, pois está dentro do timer
      }, 1000);

      return () => clearInterval(id); // limpa o timer para evitar vazamento de memória (processamento)
    }
  }, [estaCorrendo]); //Array de dependencias para que o timer rode ou não

  const horas = String(horarioAtual.getHours()).padStart(2, "0");
  const minutos = String(horarioAtual.getMinutes()).padStart(2, "0");
  const segundos = String(horarioAtual.getSeconds()).padStart(2, "0");

  return (
    <div className="container-relogio">
      <p className="hours">
        {horas}
        <br />
        <span className="label">Horas</span>
      </p>
      <p className="minutes">
        {minutos}
        <br />
        <span className="label">Minutos</span>
      </p>
      <p className="seconds">
        {segundos}
        <br />
        <span className="label">Segundos</span>
      </p>

      <button
        className="pause-play-btn"
        onClick={() => setEstaCorrendo(!estaCorrendo)}
      >
        {" "}
        {/* sempre o onClick deve passar uma função callback
        depois eu usei o operador de negação para inverter o valor atual do estaCorrendo, asssim se estiver, ele muda pra false, e se for false, ele muda pra true sem precisar de mais funções
      */}
        {estaCorrendo ? ( // Condicional ternario // se for true, então usa o svg pause e se for false usa o svg play
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 pause-svg"
          >
            <path
              fillRule="evenodd"
              d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6 play-svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
              clip-rule="evenodd"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
