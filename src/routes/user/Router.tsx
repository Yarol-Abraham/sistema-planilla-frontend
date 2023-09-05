import { Routes, Route } from 'react-router-dom';
import Create from '../../pages/user/Create';

export default function UserRouter() 
{
  return (
    <Routes>
      <Route path='create' element={<Create /> } />
    </Routes>
  );
}