import { Link } from "react-router-dom";
// components
import Menu from "../menu/Menu";
// data
import sidebarItems from './sidebar.json';
// models
import { ISidebarProps } from "../../models/sidebar/Sidebar";

export default function Sidebar(props: ISidebarProps) 
{
    
    const { toggleFC, openMenu  } = props;

    return (
        <div className="iq-sidebar bg-dark"> 
            <div className="iq-sidebar-logo d-flex justify-content-between">

                <Link to={"/"}>
                    <img src={"/src/assets/images/logo.svg"} className="img-fluid" alt="" />
                    <span className="text-uppercase text-white">TEC S.A</span>
                </Link>

                <div className="iq-menu-bt-sidebar ">
                    <div className="iq-menu-bt align-self-center bg-dark">
                        <div className={" wrapper-menu " + (openMenu ? "open" : "")} onClick={()=> toggleFC()}>
                            <div className="main-circle"><i className="ri-arrow-left-s-line"></i></div>
                            <div className="hover-circle"><i className="ri-arrow-right-s-line"></i></div>
                        </div>
                    </div>
                </div>

            </div>
            <div id="sidebar-scrollbar" style={{ height: "85vh" }}>
                <nav className="iq-sidebar-menu">
                    <Menu items={sidebarItems} className={"iq-menu"} visible={true} id="iq-sidebar-toggle" />
                </nav>
            </div>
        </div>
    );
}
