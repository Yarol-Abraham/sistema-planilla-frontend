import { ReactNode, useReducer } from "react"

import MenuContext from "../../MenuContext"
import MenuReducer from "../../reducer/menu/menuReducer";
import { initialState } from "../../models/menu/menuProps";

import request, { sendSessionIdAuthorization } from "../../../config/axios";
import { MenuResponse } from "../../models/menu/menu";

import { MENU_FAIL, MENU_SUCCESS } from "../../types/menu/menuType";
import { SessionInformationResponse } from "../../models/sessionInformation/sessionInformation";


interface props {
    children: ReactNode
}

const MenuAction: React.FC<props> = function(props)
{
    const [ state, dispatch ] = useReducer( MenuReducer, initialState);

    const getMenu = async function (sessionInformationResponse: SessionInformationResponse): Promise<MenuResponse>
    {

        let menuresponse: MenuResponse = initialState.menuResponse;

        try {
            
          sendSessionIdAuthorization(request, sessionInformationResponse.strSessionId);
            const sendRequest = await request.get(`/tec/menu/${sessionInformationResponse.intRoleSelect}`);
            menuresponse = sendRequest.data;

            dispatch({
                type: MENU_SUCCESS,
                payload: {
                    menuresponse
                }
            })
            
        } catch (error: any) {
            console.log("error: MenuAction.getMenu()" + error);
           
            dispatch({
                type: MENU_FAIL,
                payload: {
                    menuresponse
                }
            });
        }

        return Promise.resolve(menuresponse);
    }

    return(
        <MenuContext.Provider
            value={{ 
                menuResponse: state.menuResponse,
                getMenu
            }}
        >
            {props.children}
        </MenuContext.Provider>
    );

}

export default MenuAction;