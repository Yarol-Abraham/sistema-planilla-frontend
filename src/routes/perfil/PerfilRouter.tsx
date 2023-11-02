import { Routes, Route } from 'react-router-dom';
import Perfil from  '../../pages/perfil/Perfil';
import NotFound from '../../pages/notFound/NotFound';

export default function PerfilRouter() 
{
  return (
    <Routes>
      <Route path='/' element={<Perfil /> } />
      <Route path='*' element={<NotFound /> } />
    </Routes>
  );
}
