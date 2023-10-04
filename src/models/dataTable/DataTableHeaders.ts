import { TableColumn } from "react-data-table-component";
import { DataColumUser, DataColumRol } from "./DataTableColumns";

export type TableHeaderRole = TableColumn<DataColumRol>[];
export type TableHeaderUser = TableColumn<DataColumUser>[];