import  { useReducer } from 'react';
import { initialState, propsAction } from "../../models/people/peopleProps";

import PeopleContext from "../../PeopleContext";
import PeopleReducer from '../../reducer/people/peopleReducer';

import  request, { sendSessionIdAuthorization } from "../../../config/axios";
import { SUCCESS } from '../../../utils/Methods';
import { GET_PEOPLE, GET_PEOPLE_ERROR } from '../../types/people/peopleTypes';

const PeopleAction: React.FC<propsAction> = function(props)
{

    const [ state, dispatch ] = useReducer(PeopleReducer, initialState);

    const getPeoples = async function(sessionId: string) 
    {
        let peopleListResponse = initialState.peopleListResponse;

        try{
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.get("/tec/people/list");
            peopleListResponse = sendRequest.data;

            if(peopleListResponse.strResponseCode != SUCCESS)
                throw new Error(peopleListResponse.strResponseMessage);

            dispatch({ type: GET_PEOPLE, payload: { peopleListResponse } });
            
        }
        catch(err)
        {
            dispatch({ type: GET_PEOPLE_ERROR, payload: { peopleListResponse } });
        }
    }

    return (
        <PeopleContext.Provider
            value={{
                peopleListResponse: state.peopleListResponse,
                getPeoples
            }}
        >
            { props.children }
        </PeopleContext.Provider>
    );

}

export default PeopleAction;