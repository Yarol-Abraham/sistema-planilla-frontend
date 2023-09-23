import { NavLink } from "react-router-dom";

import { useMenuAction } from "../../hooks/UseMenu";

export interface IMenuProps {
    items: Array<any>, 
    className: string,
    id: string,
    dataParent?: String,
    visible?: boolean
}

export default function Menu(props: IMenuProps) 
{
    const {  menuResponse } = useMenuAction();
   
    const { className } = props;

   
    return (
        <>
            <ul className={className} id={props.id} data-parent={props.dataParent}>
                {
                   menuResponse.entModulo.map( (modulo, subIndex) => (
                   <div key={modulo.idModulo}>
                        {
                            modulo.menu.length > 0 ? (
                                <li  key={subIndex + "submenu"} className={"iq-menu-title"} >
                                <i className="ri-subtract-line" />
                                <span>{ modulo.nombre}</span>
                                <ul>
                                    { 
                                        modulo.menu.map( (menuItem, subIndex1) => (
                                            <li key={subIndex1}>
                                                {
                                                  menuItem.opciones.length > 0 ? (
                                                    <a 
                                                    role="button" 
                                                    className="iq-waves-effect collapsed" 
                                                    data-toggle="collapse" 
                                                    data-target={"#" + menuItem.nombre}
                                                onClick={(e) => e.preventDefault  } 
                                                >
                                                    <i className={"ri-pencil-ruler-line"} />
                                                    <span>{menuItem.nombre}</span>
                                                    {(menuItem.opciones !== undefined && menuItem.opciones.length > 0) && 
                                                    (<i className="ri-arrow-right-s-line iq-arrow-right" />)}
                                                </a>
                                                  ) : null
                                                }
                                               {
                                                 menuItem.opciones.length > 0 ? (
                                                    <ul className="iq-submenu collapse show" id={menuItem.idMenu+menuItem.nombre}>
                                                        {
                                                            menuItem.opciones.map((opcion, subIndex2 )=> (
                                                               <li  key={subIndex2} className="bg-dark">
                                                                    <i className="ri-subtract-line"></i>
                                                                    <NavLink to={"/"+opcion.pagina} className={"iq-waves-effect "}>
                                                                        <span className="mx-4">
                                                                        <i className="ri-checkbox-blank-circle-line"></i> {opcion.nombre}
                                                                        </span>
                                                                    </NavLink>
                                                               </li>
                                                            ) )
                                                        }
                                                    </ul>
                                                 ) : null
                                               }
                                            </li> 
                                        ) )
                                    }
                                </ul>
                            </li>
                            ) : ""
                        }                   
                   </div>
                   )) 
                }
            </ul>   
        </>
      
    );
}
