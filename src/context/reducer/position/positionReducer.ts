import { Puesto } from "../../models/position/position";
import { initialState, props } from "../../models/position/positionProps";
import { ACTION, 
        CREATE_POSITION, 
        CREATE_POSITION_ERROR,
         GET_LIST_POSITION, 
         GET_LIST_POSITION_ERROR, 
         GET_POSITION_DEPARMENT,
          GET_POSITION_DEPARMENT_ERROR,
           GET_POSITION_SELECT } from "../../types/position/positionTypes";

const PositionReducer: React.Reducer<props, ACTION> = (state: props, action: ACTION)=> 
{
    switch(action.type)
    {
        case GET_LIST_POSITION_ERROR:
        case GET_LIST_POSITION:
            return {
                ...state,
                positionListResponse: action.payload.positionListResponse
            }
          
        case GET_POSITION_DEPARMENT:
        case GET_POSITION_DEPARMENT_ERROR: 
            return {
                ...state,
                positionDeparmentListResponse: action.payload.positionDeparmentListResponse
            }
                  
        case CREATE_POSITION:
        case CREATE_POSITION_ERROR: 
            return {
                ...state,
                positionResponse: action.payload.positionResponse,
                positionListResponse: action.payload.positionListResponse
            }
            
        case GET_POSITION_SELECT:
            let positionFilter = state.positionListResponse.puestos.filter( puesto => puesto.idPuesto == action.payload.idPuesto);
            let position: Puesto = positionFilter.length > 0 ? positionFilter[0] : initialState.position;
            return {
                ...state,
                position
            }
            
        default: 
            return state;
    }
}

export default PositionReducer;