import { Persona } from "../../models/people/people";
import { initialState, props } from "../../models/people/peopleProps";
import { ACTION, CREATE_PEOPLE, CREATE_PEOPLE_ERROR, GET_PEOPLE, GET_PEOPLE_ERROR, GET_PEOPLE_SELECT } from "../../types/people/peopleTypes";

const PeopleReducer: React.Reducer<props, ACTION> = (state: props, action:ACTION)=> 
{
    switch(action.type)
    {
        case GET_PEOPLE_ERROR:
        case GET_PEOPLE: 
            return {
                ...state,
                peopleListResponse: action.payload.peopleListResponse
            }

        case CREATE_PEOPLE:
        case CREATE_PEOPLE_ERROR: 
            return {
                ...state,
                peopleResponse: action.payload.peopleResponse,
                peopleListResponse: action.payload.peopleListResponse
            }
        
        case GET_PEOPLE_SELECT:
            let peopleFilter = state.peopleListResponse.personas.filter( persona => persona.idPersona == action.payload.idPersona);
            let people: Persona = peopleFilter.length > 0 ? peopleFilter[0] : initialState.people;
            return {
                ...state,
                people
            }
            
        default: 
            return state;
    }
}

export default PeopleReducer;