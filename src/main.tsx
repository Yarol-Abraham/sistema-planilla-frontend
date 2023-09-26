import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/css/main.css';
import AuthenticationAction from './context/action/authentication/authenticationAction.tsx';
import MenuAction from './context/action/menu/menuAction.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthenticationAction>
      <MenuAction>
        <App />
      </MenuAction>
    </AuthenticationAction>
  </React.StrictMode>,
)
