import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";

// custom hook - auth
export const useAuthenticationAction = () => {
    const context = useContext(AuthenticationContext);
    if (context === undefined) {
      throw new Error('useAuthenticationAction debe usarse dentro de un AuthProvider');
    }
    return context;
  };