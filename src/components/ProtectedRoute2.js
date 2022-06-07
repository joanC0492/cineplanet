import React from "react";
import { useAuth } from "../context/useAuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  console.log("user",user);
  if (loading) return <h1>Loading...</h1>;
  
  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}

export { ProtectedRoute };
