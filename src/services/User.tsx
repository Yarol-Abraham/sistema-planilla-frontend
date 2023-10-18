
import { Button } from "reactstrap";
import { EntModulo } from "../context/models/menu/menu";
import { TableHeaderUser } from "../models/dataTable/DataTableHeaders";

export const getHeaders = function(modulos: EntModulo[], actions: Array<Function>) : TableHeaderUser
{
    let opciones: TableHeaderUser = [];

    modulos.map( modulo => {
        modulo.menu.map(
            menu => {
                menu.opciones.map(
                    opcion => {
                        if( opcion.pagina == location.pathname.replace("/", ""))
                        {
                            opciones = 
                                [
                                    {
                                        name: "Nombre",
                                        selector: row => row.nombre,
                                        sortable: true,
                                    },
                                    {
                                        name: "Apellido",
                                        selector:  row => row.apellido,
                                        sortable: true,
                                    },
                                    {
                                        name: "Correo",
                                        selector: row => row.correoElectronico,
                                        sortable: true,
                                    },
                                    {
                                        name: "Telefono",
                                        selector:  row => row.telefonoMovil,
                                        sortable: true,
                                    },
                                    {
                                        name: "Sucursal",
                                        selector:  row => row.nombreSucursal,
                                        sortable: true,
                                    },
                                    {
                                        name: "Acciones",
                                        cell: (data) => (<>
                                            <Button 
                                                className={`btn btn-info d-flex justify-content-center mx-1 ${ opcion.cambio > 0 ? "" : "d-none" } ` }
                                                onClick={ ()=>
                                                {
                                                    executeFn(actions, 0);
                                                    executeFn(actions, 4, data.idUsuario);
                                                } }
                                            >
                                                <i className="ri-edit-box-line p-0"></i>
                                            </Button>
                                            <Button
                                                disabled={ data.idStatusUsuario === 3 ? true : false }
                                                onClick={ ()=> 
                                                {
                                                    executeFn(actions, 1, data.idUsuario);
                                                    executeFn(actions, 3);
                                                }}
                                                className={`btn btn-danger mx-1 ${ opcion.baja > 0 ? "" : "d-none" } `}>
                                                    <i className="ri-close-circle-line p-0"></i>
                                            </Button>
                                            <Button 
                                                disabled={ data.idStatusUsuario === 1 ? true : false }
                                                onClick={ ()=> {
                                                    executeFn(actions, 1, data.idUsuario);
                                                    executeFn(actions, 2);
                                                }}
                                                className={`btn btn-success mx-1 ${ opcion.alta > 0 ? "" : "d-none" }  `}>
                                                    <i className="ri-checkbox-circle-line p-0"></i>
                                            </Button>
                                            
                                        </>),
                                        sortable: true
                                    },
                                
                                ];
                        }
                    }
                )
            }
        )
    });
   
    return opciones;
}

const executeFn = function( actions: Array<Function>, position: number, param: any = undefined) {
    if(actions[position] !== undefined || actions[position] != null)
    {
        if(actions[position].length > 0)
        {
            actions[position](param);
        }
        else 
        {
            actions[position]();
        }
    }
}