// ! Gerado por IA

import { useState, useRef, useEffect } from "react";

/**
 * Hook utilitário para copiar texto para o clipboard programaticamente.
 * Retorna um array [isCopied, copyText]
 * - isCopied: boolean que indica status temporário de cópia
 * - copyText(text): função async que tenta copiar e resolve true/false
 *
 * Uso (exemplo):
 * const [isCopied, copyText] = useCopyToClipboard();
 * <button onClick={() => copyText('texto a copiar')}>Copiar</button>
 */
export default function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copyText = async (text) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback para navegadores antigos: textarea + execCommand
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      // Atualiza o estado para feedback: true por 2s
      setIsCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsCopied(false), 2000);

      return true;
    } catch (err) {
      console.error("Failed to copy text:", err);
      return false;
    }
  };

  return [isCopied, copyText];
}
