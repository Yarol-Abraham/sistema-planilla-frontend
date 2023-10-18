import { Routes, Route } from 'react-router-dom';
import Login from '../../pages/authentication/Login';
import ResetPassword from '../../pages/authentication/ResetPassword';
import NotFound from '../../pages/notFound/NotFound';
import Role from '../../pages/authentication/Role';
import ConfirmMail from '../../pages/authentication/ConfirmMail';
import ConfirmNewPassword from '../../pages/authentication/ConfirmNewPassword';

export default function AuthenticationRouter() 
{
  return (
    <Routes>
      <Route path='login' element={<Login /> } /> 
      <Route path='recover-password' element={<ResetPassword /> } />
      <Route path='confirm-password' element={<ConfirmNewPassword /> } />
      <Route path='role' element={<Role /> } />
      <Route path='confirm-mail' element={<ConfirmMail /> } />
      <Route path='*' element={<NotFound /> } />
    </Routes>
  );
}
