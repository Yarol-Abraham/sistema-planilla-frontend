
import {useState} from 'react';

import Sidebar from '../components/sidebar/Sidebar';
import { Navbar as NavbarLayout } from '../components/navbar/Navbar';

import { ILayoutProps } from '../models/Layout';
import { Collapse } from 'reactstrap';
import Loader from '../components/loader/Loader';
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";


const Layout: React.FunctionComponent<ILayoutProps> = (props:ILayoutProps) => {

    const [ collapsed, setCollapse ] = useState(false);
    const [ profile, setProfile  ] = useState(false);
    const [ openMenu, setopenMenu ] = useState(false);

    const toggle = function()
    {
        document.querySelector("body")?.classList.toggle('sidebar-main');    
        setopenMenu( document.querySelector("body")?.classList.contains('sidebar-main') || false );
    }

    const toggleNavbar = () => setCollapse(!collapsed);
    const toggleProfile = () => setProfile(!profile);

  return (
    <>
        {/* Loader component */}
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
                            <img src={"/src/assets/images/1.jpg"} className="img-fluid rounded mr-3" alt="user" />
                            <div className="caption">
                                <h6 className="mb-0 line-height text-white">Yarol Abraham</h6>
                                <span className="font-size-12 text-white">Administrador</span>
                            </div>
                        </a>
                        <div className="iq-sub-dropdown iq-user-dropdown">
                            <div className="iq-card shadow-none m-0">
                                <div className="iq-card-body p-0 ">
                                    <div className="bg-primary p-3">
                                        <h5 className="mb-0 text-white line-height">Yarol Abraham</h5>
                                        <span className="text-white font-size-12">Administrador</span>
                                    </div>
                                    <a role="button" className="iq-sub-card iq-bg-primary-hover">
                                        <div className="d-flex align-items-center">
                                            <div className="rounded iq-card-icon iq-bg-primary mx-2">
                                                <i className="ri-file-user-line"></i>
                                            </div>
                                            <div className=" ml-3">
                                                <h6 className="mb-0 ">Mi Perfil</h6>
                                                <p className="mb-0 font-size-12">Ver detalles de la cuenta.</p>
                                            </div>
                                        </div>
                                    </a>
                                    <a role="button" className="iq-sub-card iq-bg-primary-hover">
                                        <div className="d-flex align-items-center">
                                            <div className="rounded iq-card-icon iq-bg-primary  mx-2">
                                                <i className="ri-profile-line"></i>
                                            </div>
                                            <div className=" ml-3">
                                                <h6 className="mb-0 ">Editar Perfil</h6>
                                                <p className="mb-0 font-size-12">Modificar detalles de mi cuenta.</p>
                                            </div>
                                        </div>
                                    </a>
                                   
                                    <div className="d-inline-block w-100 text-center p-3">
                                        <button className="bg-primary iq-sign-btn" type="button">Cerrar Sesión <i className="ri-login-box-line ml-2"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </NavbarLayout>

            <div id="content-page" className={"content-page"}>
                <div className="container-fluid">

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
