import { Routes, Route } from 'react-router-dom';
import NotFound from '../../pages/notFound/NotFound';
import { Role } from '../../pages/role/Role';

export default function RoleRouter() 
{
  return (
    <Routes>
      <Route path='/' element={<Role /> } />
      <Route path='*' element={<NotFound /> } />
    </Routes>
  );
}