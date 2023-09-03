import { Link } from "react-router-dom";

import { INavbarProps } from "../../models/Layout";

export function Navbar(props: INavbarProps) {
    return (
        <>
            <div className="iq-top-navbar">
                <div className="iq-navbar-custom">
                    <div className="iq-sidebar-logo">
                        <div className="top-logo">
                            <Link to="/" className="logo">
                                <img src={"/src/assets/images/logo.svg"} className="img-fluid" alt="" />
                                <span>Vito</span>
                            </Link>
                        </div>
                    </div>
                    <nav className="navbar navbar-expand-lg navbar-light p-0">
                        { props.children }
                    </nav>
                </div>
            </div>
        </>
    );
}
