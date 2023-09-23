import { Routes, Route } from 'react-router-dom';
import Cambio from  '../../pages/cambio/Cambio';
import NotFound from '../../pages/notFound/NotFound';

export default function CambioRouter() 
{
  return (
    <Routes>
      <Route path='/' element={<Cambio /> } />
      <Route path='*' element={<NotFound /> } />
    </Routes>
  );
}