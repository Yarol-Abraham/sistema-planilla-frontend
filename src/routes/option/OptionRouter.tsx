import { Routes, Route } from 'react-router-dom';
import NotFound from '../../pages/notFound/NotFound';
import Permission from '../../pages/option/Permission';

export default function OptionRouter()
{
    return (
        <Routes>
              <Route path='/permission' element={<Permission /> } />
              <Route path='*' element={<NotFound /> } />
        </Routes>
    )
}