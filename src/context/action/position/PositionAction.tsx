import  { useReducer } from 'react';
import { initialState, propsAction } from "../../models/position/positionProps";

import PositionContext from "../../PositionContext";
import PositionReducer from '../../reducer/position/positionReducer';

import  request, { sendSessionIdAuthorization } from "../../../config/axios";
import { SUCCESS } from '../../../utils/Methods';
import { CREATE_POSITION, CREATE_POSITION_ERROR, GET_LIST_POSITION, GET_LIST_POSITION_ERROR, GET_POSITION_DEPARMENT, GET_POSITION_DEPARMENT_ERROR, GET_POSITION_SELECT } from '../../types/position/positionTypes';
import { PositionListResponse, PositionResponse, Puesto } from '../../models/position/position';

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

    const getPositions = async function(sessionId: string)
    {
        let positionListResponse = initialState.positionListResponse;

        try{
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.get("/tec/position/list/0");
            positionListResponse = sendRequest.data;

            if(positionListResponse.strResponseCode != SUCCESS)
                throw new Error(positionListResponse.strResponseMessage);

            dispatch({ type: GET_LIST_POSITION, payload: { positionListResponse } });
            
        }
        catch(err)
        {
            dispatch({ type: GET_LIST_POSITION_ERROR, payload: { positionListResponse } });
        }
    }

    const createPosition = async function(puesto: Puesto, positionListResponse: PositionListResponse, sessionId: string)
    {
        let positionResponse: PositionResponse = initialState.positionResponse;
        try
        {
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.post("/tec/position/create", puesto);
            positionResponse = sendRequest.data;

            if(positionResponse.strResponseCode != SUCCESS)
                throw new Error(positionResponse.strResponseMessage);
            
                positionListResponse.puestos = [ ...positionListResponse.puestos, positionResponse.puesto ];

            dispatch({ type: CREATE_POSITION, payload: { positionResponse, positionListResponse } })
        }   
        catch(err)
        {
            dispatch({ type: CREATE_POSITION_ERROR, payload: { positionResponse, positionListResponse } })
        } 
        return positionResponse;
    }

    const updatePosition = async function(puesto: Puesto, positionListResponse: PositionListResponse, sessionId: string)
    {
        let positionResponse: PositionResponse = initialState.positionResponse;
        try
        {
            sendSessionIdAuthorization(request, sessionId);
            const sendRequest = await request.put("/tec/position/update", puesto);
            positionResponse = sendRequest.data;

            if(positionResponse.strResponseCode != SUCCESS)
                throw new Error(positionResponse.strResponseMessage);
            
            positionListResponse.puestos = positionListResponse.puestos.map( puesto => puesto.idPuesto == positionResponse.puesto.idPuesto ?  positionResponse.puesto: puesto  );

            dispatch({ type: CREATE_POSITION, payload: { positionResponse, positionListResponse } })
        }   
        catch(err)
        {
            dispatch({ type: CREATE_POSITION_ERROR, payload: { positionResponse, positionListResponse } })
        } 
        return positionResponse;
    }

    const getPosition = function(idPuesto: number)
    {
        dispatch({ type: GET_POSITION_SELECT, payload: { idPuesto } });
    }

    return (
        <PositionContext.Provider
            value={{
              positionDeparmentListResponse: state.positionDeparmentListResponse,
              positionResponse: state.positionResponse,
              positionListResponse: state.positionListResponse,
              position: state.position,
              getPositionByDeparment,
              getPositions,
              createPosition,
              updatePosition,
              getPosition
            }}
        >
            { props.children }
        </PositionContext.Provider>
    );

}

export default PositionAction;