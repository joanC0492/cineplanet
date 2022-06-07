import React from "react";
import { Inicio } from "./page/Inicio";
import { Login } from "./page/Login";
import { Register } from "./page/Register";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/useAuthContext";
import { Dulceria } from "./page/Dulceria";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./App.scss";

function App() {
  return (
    <main>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dulceria"
            element={
              <ProtectedRoute>
                <Dulceria />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </main>
  );
}

export default App;
