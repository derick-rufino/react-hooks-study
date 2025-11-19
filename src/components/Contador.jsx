import { useState } from "react";
import "./Contador.css";

export default function Contador() {
  const [valor, setValor] = useState(0);

  if (valor < 0) {
    setValor(0);
  }

  return (
    <div className="container-contador">
      <div className="btnContainer">
        <button onClick={() => setValor(valor + 1)} className="btn">
          + 1
        </button>
        <button onClick={() => setValor(valor + 5)} className="btn">
          + 5
        </button>
        <button onClick={() => setValor(valor + 10)} className="btn">
          + 10
        </button>
        <button onClick={() => setValor(valor - 1)} className="btn">
          - 1
        </button>
        <button onClick={() => setValor(valor - 5)} className="btn">
          - 5
        </button>
        <button onClick={() => setValor(valor - 10)} className="btn">
          - 10
        </button>
        <button onClick={() => setValor(0)} className="btnLimpar">
          limpar
        </button>
      </div>
      <div className="displayValor">{valor}</div>
    </div>
  );
}
