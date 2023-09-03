import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import NotFound from './pages/notFound/NotFound';
import AuthenticationRouter from './routes/AuthenticationRouter';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/auth/*' element={ <AuthenticationRouter /> } />
            <Route path='/' element={<Dashboard />} />
            <Route path='*' element={<NotFound /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
