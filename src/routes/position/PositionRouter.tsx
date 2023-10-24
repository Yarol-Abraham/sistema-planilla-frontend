import { Routes, Route } from 'react-router-dom';
import NotFound from '../../pages/notFound/NotFound';
import Position  from '../../pages/position/Position';

export default function PositionRouter() 
{
  return (
    <Routes>
      <Route path='/' element={<Position /> } />
      <Route path='*' element={<NotFound /> } />
    </Routes>
  );
} 