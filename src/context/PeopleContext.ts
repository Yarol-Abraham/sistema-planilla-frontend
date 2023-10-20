import { createContext } from 'react';
import { props, initialState } from './models/people/peopleProps';

const PeopleContext = createContext<props>(initialState);

export default PeopleContext;