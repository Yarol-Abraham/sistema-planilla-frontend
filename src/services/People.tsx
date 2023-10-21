
import { Button } from "reactstrap";
import { EntModulo } from "../context/models/menu/menu";
import { TableHeaderPeople } from "../models/dataTable/DataTableHeaders";

export const getHeaders = function(modulos: EntModulo[], actions: Array<Function>) : TableHeaderPeople
{
    let opciones: TableHeaderPeople = [];

    modulos.map( modulo => {
        modulo.menu.map(
            menu => {
                menu.opciones.map(
                    opcion => {
                        if( opcion.pagina == location.pathname.replace("/", ""))
                        {
                            opciones = [
                                {
                                    name: "Nombre",
                                    selector: row => row.nombre,
                                    sortable: true,
                                },
                                {
                                    name: "Apellido",
                                    selector: row => row.apellido,
                                    sortable: true,
                                },
                                {
                                    name: "Telefono",
                                    selector: row => row.telefono,
                                    sortable: true,
                                },
                                {
                                    name: "Correo Electronico",
                                    selector: row => row.correoElectronico,
                                    sortable: true,
                                    width: '15rem'
                                },
                                {
                                    name: "Dirección",
                                    selector: row => row.direccion,
                                    sortable: true,
                                    width: '15rem',
                                    wrap: true
                                },
                                {
                                    name: "Estado Civil",
                                    selector: row => row.estadoCivil,
                                    sortable: true,
                                },
                                {
                                    name: "Acciones",
                                    cell: (data) => (
                                        <>
                                            <Button 
                                                className={`btn btn-info d-flex justify-content-center mx-1 ${ opcion.cambio > 0 ? "" : "d-none" } ` }
                                                onClick={ ()=> {
                                                    executeFn(actions, 1, +data.idPersona);
                                                    executeFn(actions, 0);
                                                }}
                                            >
                                                <i className="ri-edit-box-line p-0"></i>
                                            </Button>
                                        </>
                                    ),
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