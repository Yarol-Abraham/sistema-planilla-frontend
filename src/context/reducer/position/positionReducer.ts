import { props } from "../../models/position/positionProps";
import { ACTION, GET_POSITION_DEPARMENT, GET_POSITION_DEPARMENT_ERROR } from "../../types/position/positionTypes";


const PositionReducer: React.Reducer<props, ACTION> = (state: props, action:ACTION)=> 
{
    switch(action.type)
    {
        case GET_POSITION_DEPARMENT:
        case GET_POSITION_DEPARMENT_ERROR: 
            return {
                ...state,
                positionDeparmentListResponse: action.payload.positionDeparmentListResponse
            }

            
        default: 
            return state;
    }
}

export default PositionReducer;