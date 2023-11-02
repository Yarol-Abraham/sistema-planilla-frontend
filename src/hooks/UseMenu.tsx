import { useContext } from "react";
import MenuContext from "../context/MenuContext";

// custom hook - auth
export const useMenuAction = () => {
    const context = useContext(MenuContext);
    if (context === undefined) {
      throw new Error('useAuthenticationAction debe usarse dentro de un AuthProvider');
    }
    return context;
  };