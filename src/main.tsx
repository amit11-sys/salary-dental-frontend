import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { LoadingProvider } from "./context/LoadingContext.tsx";
import { BrowserRouter } from "react-router-dom";
import Spinner from "./components/Loaders.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <LoadingProvider>
        <BrowserRouter>
          <Spinner />
          <ToastContainer />
          <App />
        </BrowserRouter>
      </LoadingProvider>{" "}
    </AuthProvider>
  </StrictMode>
);
