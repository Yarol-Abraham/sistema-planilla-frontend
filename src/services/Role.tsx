
import { Button } from "reactstrap";
import { EntModulo } from "../context/models/menu/menu";
import { TableHeaderRole } from "../models/dataTable/DataTableHeaders";

export const getHeaders = function(modulos: EntModulo[]) : TableHeaderRole
{
    let opciones: TableHeaderRole = [];

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
                                    name: "Acciones",
                                    cell: (data) => (
                                        <Button 
                                            className={`btn btn-info d-flex justify-content-center mx-1 ${ opcion.cambio > 0 ? "" : "d-none" } ` }
                                            onClick={ ()=> 
                                            {
                                                console.log(data);
                                            }}
                                        >
                                            <i className="ri-edit-box-line p-0"></i>
                                        </Button>),
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