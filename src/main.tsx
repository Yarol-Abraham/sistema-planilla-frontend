import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/css/main.css';
import AuthenticationAction from './context/action/authentication/authenticationAction.tsx';
import MenuAction from './context/action/menu/menuAction.tsx';
import UserAction from './context/action/user/userAction.tsx';
import RoleAction from './context/action/role/roleAction.tsx';
import PeopleAction from './context/action/people/peopleAction.tsx';
import EmployeeAction from './context/action/employee/employeeAction.tsx';
import PositionAction from './context/action/position/PositionAction.tsx';
import DepartmentAction from './context/action/department/departmentAction.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DepartmentAction>
      <PositionAction>
        <EmployeeAction>
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
        </EmployeeAction> 
      </PositionAction>
    </DepartmentAction>
  </React.StrictMode>,
)
