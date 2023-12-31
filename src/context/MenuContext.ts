import { createContext } from "react";
import { props, initialState } from "./models/menu/menuProps";

 const MenuContext = createContext<props>({
    menuResponse: initialState.menuResponse,
    getMenu(){ return Promise.resolve(this.menuResponse) }
 });
 
 export default MenuContext;