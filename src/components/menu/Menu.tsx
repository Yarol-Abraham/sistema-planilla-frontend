import { NavLink } from "react-router-dom";

export interface IMenuProps {
    items: Array<any>, 
    className: string,
    id: string,
    dataParent?: String,
    visible?: boolean
}

const getActiveLink = (item: any) => {
    let link = (item.link === undefined || item.link === '/') ? '' : item.link;
    let active = false;
    let windowPath = window.location.pathname;
    let windowLength = (windowPath.length - 1)
    let removePreg = windowPath[windowLength]
    if (removePreg === '/') {
      windowPath = windowPath.slice(0, windowLength)
    }
  
    if (item.children !== undefined) {
      item.children.filter(function (child: any) {
        let base_path = import.meta.env.VITE_PUBLIC_URL + child.link;
        if (base_path === windowPath) {
          active = true;
        }
      });
    } else {
      let base_path = import.meta.env.VITE_PUBLIC_UR + link;
      if (base_path === windowPath) {
        active = true
      }
    }
    window.scrollTo(0, 0);
    return active;
  
  };


export default function Menu(props: IMenuProps) {
    const { items, className } = props;

   
    return (

        <ul className={className} id={props.id} data-parent={props.dataParent}>
            {items.map((subItem, subIndex) => (
                < li key={subIndex + "submenu"} className={(subItem.is_heading) ? "iq-menu-title" : "" + (subItem.is_active === true ? " active show" : "") + (getActiveLink(subItem) ? "active show" : "" ) }>
                    {
                        (subItem.is_heading) ?
                            (
                                <>
                                    <i className="ri-subtract-line" />
                                    <span>{subItem.title}</span>
                                </>
                            ) :
                            (
                                (subItem.link !== undefined) ? (
                                    <NavLink to={subItem.link} className={"iq-waves-effect  " + getActiveLink(subItem) && subItem.children ? 'active' : getActiveLink(subItem) ? 'active' : ''}>
                                        {subItem.icon && (<i className={subItem.icon} />)}
                                        <span>{subItem.title}</span>
                                    </NavLink>
                                )
                                    :
                                    (
                                        <a role="button" onClick={(e) => e.preventDefault} className="iq-waves-effect collapsed" data-toggle="collapse" data-target={"#" + subItem.name} aria-expanded={ getActiveLink(subItem)  ? true : false}>
                                            {subItem.icon && (<i className={subItem.icon} />)}
                                            <span>{subItem.title}</span>

                                            {(subItem.children !== undefined && subItem.children.length > 0) && (<i className="ri-arrow-right-s-line iq-arrow-right" />)}
                                        </a>
                                        
                                    )

                                    
                            )}
                    {(subItem.children !== undefined && subItem.children.length > 0) && (
                        <Menu items={subItem.children} className={"iq-submenu collapse " + subItem.className ?? ''} id={subItem.name} dataParent={subItem.class_name !== undefined && subItem.class_name !== '' ? '' : '#iq-sidebar-toggle'} />
                    )}
                </li>
            ))
            }
        </ul >
    );
}
