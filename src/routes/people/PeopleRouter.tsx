import { Route, Routes } from "react-router-dom";
import NotFound from '../../pages/notFound/NotFound';
import People from "../../pages/people/People";

export default function PeopleRouter() 
{
    return (
        <Routes>
            <Route path="/" element={<People /> } />
            <Route path='*' element={<NotFound /> } />
        </Routes>
    )
}