
import { Button } from "reactstrap";
import { EntModulo } from "../context/models/menu/menu";
import { TableHeaderEmployee } from "../models/dataTable/DataTableHeaders";

export const getHeaders = function(modulos: EntModulo[], actions: Array<Function>) : TableHeaderEmployee
{
    let opciones: TableHeaderEmployee = [];

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
                                    selector: row => row.persona.nombre,
                                    sortable: true,
                                },
                                {
                                    name: "Apellido",
                                    selector: row => row.persona.apellido,
                                    sortable: true,
                                },
                                {
                                    name: "Puesto",
                                    selector: row => row.puesto.nombre,
                                    sortable: true,
                                     width: '15rem',
                                    wrap: true
                                },
                                {
                                    name: "Fecha Contratacion",
                                    selector: row => row.fechaContratacion,
                                    sortable: true,
                                     width: '10rem'
                                },
                                {
                                    name: "Sueldo Base",
                                    selector: row => row.ingresoSueldoBase,
                                    sortable: true,
                                    width: '10rem'
                                    // wrap: true
                                },
                                {
                                    name: "Bon. Decreto",
                                    selector: row => row.ingresoBonificacionDecreto,
                                    sortable: true,
                                    width: '10rem'

                                },
                                {
                                    name: "Otros Ingresos",
                                    selector: row => row.ingresoOtrosIngresos,
                                    sortable: true,
                                    width: '10rem'

                                },
                                {
                                    name: "Des. IGSS",
                                    selector: row => row.ingresoOtrosIngresos,
                                    sortable: true,
                                    width: '10rem'

                                },
                                {
                                    name: "Des. ISR",
                                    selector: row => row.descuentoIsr,
                                    sortable: true,
                                    width: '10rem'

                                },
                                {
                                    name: "Des. Inasistencias",
                                    selector: row => row.descuentoInasistencias,
                                    sortable: true,
                                    width: '10rem'

                                },
                                {
                                    name: "Acciones",
                                    cell: (data) => (
                                        <>
                                            <Button 
                                                className={`btn btn-info d-flex justify-content-center mx-1 ${ opcion.cambio > 0 ? "" : "d-none" } ` }
                                                onClick={ ()=> {
                                                    executeFn(actions, 2);
                                                    executeFn(actions, 1, +data.idEmpleado);
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