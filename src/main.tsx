import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/css/main.css';
import AuthenticationAction from './context/action/authentication/authenticationAction.tsx';
import MenuAction from './context/action/menu/menuAction.tsx';
import UserAction from './context/action/user/userAction.tsx';
import RoleAction from './context/action/role/roleAction.tsx';
import PeopleAction from './context/action/people/peopleAction.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PeopleAction>
      <RoleAction>
        <UserAction>
          <AuthenticationAction>
            <MenuAction>
              <App />
            </MenuAction>
          </AuthenticationAction>
        </UserAction>
      </RoleAction>
    </PeopleAction> 
  </React.StrictMode>,
)
