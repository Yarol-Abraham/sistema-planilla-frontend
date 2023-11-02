import { Routes, Route } from 'react-router-dom';
import NotFound from '../../pages/notFound/NotFound';
import Role  from '../../pages/role/Role';
import Permission from '../../pages/role/permission';

export default function RoleRouter() 
{
  return (
    <Routes>
      <Route path='/' element={<Role /> } />
      <Route path='/permission' element={<Permission /> } />
      <Route path='*' element={<NotFound /> } />
    </Routes>
  );
} 