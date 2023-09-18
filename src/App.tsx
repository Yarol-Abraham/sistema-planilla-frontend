import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import NotFound from './pages/notFound/NotFound';
import AuthenticationRouter from './routes/authentication/AuthenticationRouter';
import UserRouter from './routes/user/UserRouter';
import RoleRouter from './routes/role/RoleRouter';
import AuditoriaRouter from './routes/auditoria/AuditoriaRouter';
import ModuloRouter from './routes/modulo/ModuloRouter';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/auth/*' element={ <AuthenticationRouter /> } />
            <Route path='/user/*' element={ <UserRouter /> } />
            <Route path='/' element={<Dashboard />} />
            <Route path='/role' element={<RoleRouter />} />
            <Route path='/auditoria' element={<AuditoriaRouter />} />
            <Route path='/modulo' element={<ModuloRouter />} />
            <Route path='*' element={<NotFound /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
