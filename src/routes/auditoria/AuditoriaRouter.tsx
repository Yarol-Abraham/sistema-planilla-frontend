import { Routes, Route } from 'react-router-dom';
import Auditoria from  '../../pages/auditoria/Auditoria';
import NotFound from '../../pages/notFound/NotFound';

export default function AuditoriaRouter() 
{
  return (
    <Routes>
      <Route path='/' element={<Auditoria /> } />
      <Route path='*' element={<NotFound /> } />
    </Routes>
  );
}