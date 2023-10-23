import { useContext } from "react";
import PositionContext from "../context/PositionContext";

// custom hook
export const usePositionContext = () => {
    const context = useContext(PositionContext);
    if (context === undefined) {
      throw new Error('usePositionContext debe usarse dentro de un PositionProvider');
    }
    return context;
  };