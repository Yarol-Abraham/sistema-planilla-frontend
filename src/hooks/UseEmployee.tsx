import { useContext } from "react";
import EmployeeContext from "../context/EmployeeContext";

export const useEmployee = () => {
    const context = useContext(EmployeeContext);
    if (context === undefined) {
      throw new Error('useEmployee debe usarse dentro de un EmployeeProvider');
    }
    return context;
};