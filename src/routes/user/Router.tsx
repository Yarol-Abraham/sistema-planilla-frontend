import { Routes, Route } from 'react-router-dom';
import User from '../../pages/user/Index';
import NotFound from '../../pages/notFound/NotFound';

export default function UserRouter() 
{
  return (
    <Routes>
      <Route path='/' element={<User /> } />
      <Route path='*' element={<NotFound /> } />
    </Routes>
  );
}