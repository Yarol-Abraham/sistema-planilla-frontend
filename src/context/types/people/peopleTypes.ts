import { PeopleListResponse } from "../../models/people/people";

export const GET_PEOPLE = "GET_PEOPLE";
export const GET_PEOPLE_ERROR = "GET_PEOPLE_ERROR";

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