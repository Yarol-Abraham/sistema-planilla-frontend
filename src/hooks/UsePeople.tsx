import { useContext } from "react";
import PeopleContext from "../context/PeopleContext";

export const usePeople = () => {
    const context = useContext(PeopleContext);
    if (context === undefined) {
      throw new Error('usePeopleContext debe usarse dentro de un PeopleProvider');
    }
    return context;
};