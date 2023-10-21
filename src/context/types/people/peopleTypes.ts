import { PeopleListResponse, PersonaResponse } from "../../models/people/people";

export const GET_PEOPLE = "GET_PEOPLE";
export const GET_PEOPLE_ERROR = "GET_PEOPLE_ERROR";

export const CREATE_PEOPLE = "CREATE_PEOPLE";
export const CREATE_PEOPLE_ERROR = "CREATE_PEOPLE_ERROR";

export const GET_PEOPLE_SELECT = "GET_PEOPLE_SELECT";
 
export type ACTION = |  
    {
       type: "GET_PEOPLE",
       payload: {
        peopleListResponse: PeopleListResponse
       }
    }
    |
    {
        type: "GET_PEOPLE_ERROR",
        payload: {
         peopleListResponse: PeopleListResponse
        }
     }
     |
    {
        type: "CREATE_PEOPLE",
        payload: {
            peopleResponse: PersonaResponse,
            peopleListResponse: PeopleListResponse,
        }
     }
     |
    {
        type: "CREATE_PEOPLE_ERROR",
        payload: {
            peopleResponse: PersonaResponse,
            peopleListResponse: PeopleListResponse
        }
     }
     |
    {
        type: "GET_PEOPLE_SELECT",
        payload: {
            idPersona: number
        }
     }