import { Route, Routes } from "react-router-dom";
import NotFound from '../../pages/notFound/NotFound';
import Department from "../../pages/department/Department";

export default function DepartmentRouter() 
{
    return (
        <Routes>
            <Route path="/" element={<Department /> } />
            <Route path='*' element={<NotFound /> } />
        </Routes>
    )
}