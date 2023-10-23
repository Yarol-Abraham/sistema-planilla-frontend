import { createContext } from 'react';
import { props, initialState } from './models/employee/employeeProps';

const EmployeeContext = createContext<props>(initialState);

export default EmployeeContext;