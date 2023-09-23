import { ReactNode, useReducer } from "react"

import MenuContext from "../MenuContext"
import MenuReducer from "../reducer/menuReducer";
import { initialState } from "../inteface/menu/menuProps";

import request, { sendSessionIdAuthorization } from "../../config/axios";
import { MenuResponse } from "../inteface/menu/menu";

import { MENU_FAIL, MENU_SUCCESS } from "../types/menuType";
import { SessionInformationResponse } from "../inteface/sessionInformation/sessionInformation";


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
            
          //  const sendRequest = await sendSessionIdAuthorization(request, sessionInformationResponse.strSessionId).get(`/tec/menu/${sessionInformationResponse.intRoleSelect}`);
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