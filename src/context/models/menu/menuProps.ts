import { SessionInformationResponse } from "../sessionInformation/sessionInformation";
import { MenuResponse } from "./menu";

export interface props {
    menuResponse: MenuResponse,
    getMenu: (sessionInformationResponse: SessionInformationResponse) => Promise<MenuResponse>
}

export const initialState: props = {
    menuResponse : {
        strResponseCode: "",
        strResponseMessage: "",
        entModulo: []
    },
    getMenu: function() { return Promise.resolve(this.menuResponse) }
}