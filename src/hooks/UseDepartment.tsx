import { useContext } from "react";
import DepartmentContext from "../context/DepartmentContext";

// custom hook
export const useDepartmentContext = () => {
    const context = useContext(DepartmentContext);
    if (context === undefined) {
      throw new Error('useDepartmentContext debe usarse dentro de un DepartmentProvider');
    }
    return context;
  };