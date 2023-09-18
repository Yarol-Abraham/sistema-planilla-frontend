import { Routes, Route } from 'react-router-dom';
import Modulo from  '../../pages/modulo/Modulo';
import NotFound from '../../pages/notFound/NotFound';

export default function ModuloRouter() 
{
  return (
    <Routes>
      <Route path='/' element={<Modulo /> } />
      <Route path='*' element={<NotFound /> } />
    </Routes>
  );
}