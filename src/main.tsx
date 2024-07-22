import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
      <Toaster visibleToasts={1} position="top-right" richColors />
    </BrowserRouter>
  </React.StrictMode>
);
