import  { useReducer } from 'react';
import { initialState, propsAction } from "../../models/people/peopleProps";

import PeopleContext from "../../PeopleContext";
import PeopleReducer from '../../reducer/people/peopleReducer';

import  request, { sendSessionIdAuthorization } from "../../../config/axios";
import { SUCCESS } from '../../../utils/Methods';
import { CREATE_PEOPLE, CREATE_PEOPLE_ERROR, GET_PEOPLE, GET_PEOPLE_ERROR, GET_PEOPLE_SELECT } from '../../types/people/peopleTypes';
import { PeopleCreate, PeopleListResponse, PersonaResponse } from '../../models/people/people';

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

    const createPeople = async function(persona: PeopleCreate, peopleListResponse: PeopleListResponse, sessionId: string) 
    {
        let peopleResponse: PersonaResponse = initialState.peopleResponse;
        try
        {
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.post("/tec/people/create", persona);
            peopleResponse = sendRequest.data;

            if(peopleResponse.strResponseCode != SUCCESS)
                throw new Error(peopleResponse.strResponseMessage);
            
            peopleListResponse.personas = [ ...peopleListResponse.personas, peopleResponse.persona ];

            dispatch({ type: CREATE_PEOPLE, payload: { peopleResponse, peopleListResponse } })
        }   
        catch(err)
        {
            dispatch({ type: CREATE_PEOPLE_ERROR, payload: { peopleResponse, peopleListResponse } })
        } 
        return peopleResponse;
    }

    const updatePeople = async function(persona: PeopleCreate, peopleListResponse: PeopleListResponse, sessionId: string) 
    {
        let peopleResponse: PersonaResponse = initialState.peopleResponse;
        try
        {
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.put("/tec/people/update", persona);
            peopleResponse = sendRequest.data;

            if(peopleResponse.strResponseCode != SUCCESS)
                throw new Error(peopleResponse.strResponseMessage);
            
            peopleListResponse.personas = peopleListResponse.personas.map( persona => persona.idPersona == peopleResponse.persona.idPersona ?  peopleResponse.persona: persona  );

            dispatch({ type: CREATE_PEOPLE, payload: { peopleResponse, peopleListResponse } })
        }   
        catch(err)
        {
            dispatch({ type: CREATE_PEOPLE_ERROR, payload: { peopleResponse, peopleListResponse } })
        } 
        return peopleResponse;
    }

    const getPeople = function (idPersona: number)
    {
        dispatch({ type: GET_PEOPLE_SELECT, payload: { idPersona } });
    }

    return (
        <PeopleContext.Provider
            value={{
                peopleListResponse: state.peopleListResponse,
                peopleResponse: state.peopleResponse,
                people: state.people,
                getPeoples,
                createPeople,
                updatePeople,
                getPeople
            }}
        >
            { props.children }
        </PeopleContext.Provider>
    );

}

export default PeopleAction;