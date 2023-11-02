import { createContext } from 'react';
import { props, initialState } from './models/department/departmentProps';

const DepartmentContext = createContext<props>(initialState);

export default DepartmentContext;