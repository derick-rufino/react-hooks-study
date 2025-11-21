import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from "./utils/ToastContext";
import ToastContainer from "./components/toast/ToastContainer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <App />
      <ToastContainer />
    </ToastProvider>
  </StrictMode>
);
