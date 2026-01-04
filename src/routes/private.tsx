import type { ReactNode } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
interface PriviteProps {
  children: ReactNode;
}

export function Private({ children }: PriviteProps) {
  const { loadingAuth, signed } = useContext(AuthContext);

  if (loadingAuth) {
    return <div>Carregando....</div>;
  }

  if (!signed) {
    return <Navigate to={"/login"} />;
  }

  return children;
}
