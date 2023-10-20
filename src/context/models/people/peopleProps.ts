import { ReactNode } from 'react';
import { PeopleListResponse } from "./people"

export interface propsAction {
    children: ReactNode
}
export interface props {
    peopleListResponse: PeopleListResponse,
    getPeoples: (sessionId: string)=> void
}

export const initialState: props = {
    peopleListResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        personas: []
    },
    getPeoples(){}
}