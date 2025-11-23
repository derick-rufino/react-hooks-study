import { createContext, useEffect, useContext, useMemo, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  // Detecta preferência do OS/navegador para definir tema inicial
  const getInitialTheme = () => {
    // Primeiro tenta pegar do localStorage
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme &&
      ["light", "dark", "light-pink", "light-yellow"].includes(savedTheme)
    ) {
      return savedTheme;
    }

    // Se não há tema salvo, verifica preferência do OS
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    // light theme é o padrão
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // Aplica o tema no DOM
    document.documentElement.setAttribute("data-theme", theme);

    // Salva o tema no localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // observa mudanças na preferência do OS apenas se não há tema salvo
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      // Só muda automaticamente se não há tema salvo pelo usuário no localStotage
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const contextValue = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
