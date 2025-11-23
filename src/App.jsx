import "./App.css";

import { ThemeProvider } from "./contexts/ThemeContext";

import Contador from "./components/contador/Contador";
import FormularioCadastro from "./components/form-cadastro/FormularioCadastro";
import ListaTarefas from "./components/lista-tarefas/ListaTarefas";
import Relogio from "./components/relogio/relogio";
import ThemeSelector from "./components/seletor-temas/ThemeSelector";

export default function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Relogio />
        <ThemeSelector />
        <Contador />
        <FormularioCadastro />
        <ListaTarefas />
      </div>
    </ThemeProvider>
  );
}
