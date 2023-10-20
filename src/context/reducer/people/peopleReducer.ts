import { props } from "../../models/people/peopleProps";
import { ACTION, GET_PEOPLE, GET_PEOPLE_ERROR } from "../../types/people/peopleTypes";

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
        default: 
            return state;
    }
}

export default PeopleReducer;