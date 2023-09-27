import { useContext } from "react";
import RoleContext from "../context/RoleContext";

// custom hook - user
export const useRole = () => {
    const context = useContext(RoleContext);
    if (context === undefined) {
      throw new Error('useRole debe usarse dentro de un RoleProvider');
    }
    return context;
  };