import { props } from "../../models/menu/menuProps";
import { ACTION, MENU_FAIL, MENU_SUCCESS } from "../../types/menu/menuType";


const MenuReducer: React.Reducer<props, ACTION> = (state: props, action: ACTION) => {

    switch(action.type)
    {

        case MENU_SUCCESS:
        case MENU_FAIL:
            return {
                ...state,
                menuResponse: action.payload.menuresponse
            }
        default: 
            return state;
    }
}

export default MenuReducer;