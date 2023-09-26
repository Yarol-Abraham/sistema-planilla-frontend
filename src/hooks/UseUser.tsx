import { useContext } from "react";
import UserContext from "../context/UserContext";
// custom hook - user
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUser debe usarse dentro de un AuthProvider');
    }
    return context;
  };