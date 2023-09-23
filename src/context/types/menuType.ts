import { MenuResponse } from "../inteface/menu/menu";

export const MENU_SUCCESS  = "MENU_SUCCESS";
export const MENU_FAIL = "MENU_FAIL";

export type ACTION = | 
    {
        type: "MENU_SUCCESS",
        payload: {
            menuresponse: MenuResponse
        }
    }
    | {
        type: "MENU_FAIL",
        payload: {
            menuresponse: MenuResponse
        }
    }