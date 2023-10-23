import  { useReducer } from 'react';
import { initialState, propsAction } from "../../models/position/positionProps";

import PositionContext from "../../PositionContext";
import PositionReducer from '../../reducer/position/positionReducer';

import  request, { sendSessionIdAuthorization } from "../../../config/axios";
import { SUCCESS } from '../../../utils/Methods';
import { GET_POSITION_DEPARMENT, GET_POSITION_DEPARMENT_ERROR } from '../../types/position/positionTypes';

const PositionAction: React.FC<propsAction> = function(props)
{

    const [ state, dispatch ] = useReducer(PositionReducer, initialState);

    const getPositionByDeparment = async function(idDeparment: number, sessionId: string) 
    {
        let positionDeparmentListResponse = initialState.positionDeparmentListResponse;

        try{
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.get(`/tec/position/list/${idDeparment}`);
            positionDeparmentListResponse = sendRequest.data;

            if(positionDeparmentListResponse.strResponseCode != SUCCESS)
                throw new Error(positionDeparmentListResponse.strResponseMessage);

            dispatch({ type: GET_POSITION_DEPARMENT, payload: { positionDeparmentListResponse } });
            
        }
        catch(err)
        {
            dispatch({ type: GET_POSITION_DEPARMENT_ERROR, payload: { positionDeparmentListResponse } });
        }
    }

    return (
        <PositionContext.Provider
            value={{
              positionDeparmentListResponse: state.positionDeparmentListResponse,
              getPositionByDeparment
            }}
        >
            { props.children }
        </PositionContext.Provider>
    );

}

export default PositionAction;