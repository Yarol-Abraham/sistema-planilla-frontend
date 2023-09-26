
import {useState, useEffect} from 'react';

import { Link } from 'react-router-dom';

import Sidebar from '../components/sidebar/Sidebar';
import { Navbar as NavbarLayout } from '../components/navbar/Navbar';

import { ILayoutProps } from '../models/Layout';
import { Collapse } from 'reactstrap';
import Loader from '../components/loader/Loader';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { useAuthenticationAction } from '../hooks/UseAuthentication'; 
import { useMenuAction } from '../hooks/UseMenu';

import { useNavigate } from 'react-router-dom';

const Layout: React.FunctionComponent<ILayoutProps> = (props:ILayoutProps) => {

    const { sessionInformationResponse } = useAuthenticationAction();
    const {  getMenu } = useMenuAction();

    const navigate = useNavigate();

    const [ collapsed, setCollapse ] = useState(false);
    const [ profile, setProfile  ] = useState(false);
    const [ openMenu, setopenMenu ] = useState(false);
    const [role, setRole] = useState("");

    const handleLogout = async () => {
        try {
            localStorage.removeItem("sessionInfomation");
            window.location.replace("/auth/login");
          
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      };

    const toggle = function()
    {
        document.querySelector("body")?.classList.toggle('sidebar-main');    
        setopenMenu( document.querySelector("body")?.classList.contains('sidebar-main') || false );
    }

    const toggleNavbar = () => setCollapse(!collapsed);
    const toggleProfile = () => setProfile(!profile);

    const getRole = function()
    {
        let role = sessionInformationResponse.listRoles?.filter(el =>  el.idRole == sessionInformationResponse.intRoleSelect );
      
        if(role.length > 0)
        {
            setRole(role[0].nombre);
        } // en caso de que no selecciono rol pero tiene sesion activa, redireccionar a seleccionar
        else {
            if(sessionInformationResponse.listRoles.length > 0)
            {
                navigate("/auth/role");
            }
        }
    } 

    useEffect(()=> getRole(), [sessionInformationResponse.listRoles])

    useEffect(()=> {
       if(sessionInformationResponse.strSessionId != undefined && sessionInformationResponse.strSessionId != "" ) 
       {
            getMenu(sessionInformationResponse);
       };
    }, [sessionInformationResponse.strSessionId])

  return (
    <>
        
        <Loader />
        <div className="wrapper">
            <Sidebar toggleFC={toggle} openMenu={openMenu} />
            <NavbarLayout >
            <div className="navbar-left"></div>
                <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
                    <i className="ri-menu-3-line" /> 
                </button>
                <div className="iq-menu-bt align-self-center" onClick={toggle}>
                    <div className="wrapper-menu">
                        <div className="main-circle"><i className="ri-arrow-left-s-line"></i></div>
                        <div className="hover-circle"><i className="ri-arrow-right-s-line"></i></div>
                    </div>
                </div>
                <Collapse navbar></Collapse>
                <ul className=" navbar-list ">
                    <li className={ profile ? "iq-show" : ""}>
                        <a 
                            role="button" 
                            className="avatar-custom search-toggle iq-waves-effect d-flex align-items-center justify-content-between bg-primary rounded"
                            onClick={toggleProfile}
                        >
                            <img src={"/src/assets/images/usuario_create.png"} className="img-fluid rounded mr-3" alt="user" />
                            <div className="caption">
                                <h6 className="mb-0 line-height text-white">{sessionInformationResponse.strNombre}</h6>
                                <span className="font-size-12 text-white">{role}</span>
                            </div>
                        </a>
                        <div className="iq-sub-dropdown iq-user-dropdown">
                            <div className="iq-card shadow-none m-0">
                                <div className="iq-card-body p-0 ">
                                    <div className="bg-primary p-3">
                                        <h5 className="mb-0 text-white line-height">{sessionInformationResponse.strNombre}</h5>
                                        <span className="text-white font-size-12">{role}</span>
                                    </div>

                                    <Link to="/perfil" className="iq-sub-card iq-bg-primary-hover">
                                        <div className="d-flex align-items-center">
                                            <div className="rounded iq-card-icon iq-bg-primary mx-2">
                                                <i className="ri-file-user-line"></i>
                                            </div>
                                            <div className=" ml-3">
                                                <h6 className="mb-0 ">Mi Perfil</h6>
                                                <p className="mb-0 font-size-12">Modificar detalles de la cuenta.</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="/cambio" className="iq-sub-card iq-bg-primary-hover">
                                        <div className="d-flex align-items-center">
                                            <div className="rounded iq-card-icon iq-bg-primary  mx-2">
                                                <i className="ri-profile-line"></i>
                                            </div>
                                            <div className=" ml-3">
                                                <h6 className="mb-0 ">Configuraciones</h6>
                                                <p className="mb-0 font-size-12">Modificar detalles de seguridad.</p>
                                            </div>
                                        </div>
                                        </Link>
                                   
                                        <div className="d-inline-block w-100 text-center p-3">
                                      <button
                                        className="bg-primary iq-sign-btn"
                                            type="button"
                                             onClick={handleLogout}
                                                     >
                                             Cerrar Sesión <i className="ri-login-box-line ml-2"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </NavbarLayout>

            <div id="content-page" className={"content-page"}>
                <div className="container-fluid px-2">
                <TransitionGroup>
                    <CSSTransition
                        classNames="dialog"
                        timeout={300}
                    >
                        {props.children}
                    </CSSTransition>
                </TransitionGroup>
                </div>
            </div>
        </div>
    </>
    
  );
};

export default Layout;
