import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./App";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

const customToster = {
  duration: 3000,
  removeDelay: 1000,
  style: {
    padding: "10px",
    color: "#020202",
  },
  success: {
    style: {
      background: "#00c950",
    },
  },
  error: {
    style: {
      background: "#c10007",
    },
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-right" toastOptions={customToster} />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
