import { Route, Routes } from "react-router-dom";
import NotFound from '../../pages/notFound/NotFound';
import Employee from "../../pages/employee/Employee";

export default function EmployeeRouter() 
{
    return (
        <Routes>
            <Route path="/" element={<Employee /> } />
            <Route path='*' element={<NotFound /> } />
        </Routes>
    )
}