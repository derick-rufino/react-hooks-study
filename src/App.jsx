import "./App.css";

import Contador from "./components/contador/Contador";
import FormularioCadastro from "./components/form-cadastro/FormularioCadastro";
import Relogio from "./components/relogio/relogio";

export default function App() {
  return (
    <div className="app">
      <Relogio />
      <Contador />
      <FormularioCadastro />
    </div>
  );
}
