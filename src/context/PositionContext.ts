import { createContext } from 'react';
import { props, initialState } from './models/position/positionProps';

const PositionContext = createContext<props>(initialState);

export default PositionContext;