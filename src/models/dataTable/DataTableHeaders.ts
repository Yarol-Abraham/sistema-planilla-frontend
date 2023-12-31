import { TableColumn } from "react-data-table-component";
import { DataColumUser, DataColumRol, DataColumnPersona, DataColumnEmployee, DataColumnPosition,DataColumnDepartment } from "./DataTableColumns";

export type TableHeaderRole = TableColumn<DataColumRol>[];
export type TableHeaderUser = TableColumn<DataColumUser>[];
export type TableHeaderPeople = TableColumn<DataColumnPersona>[];
export type TableHeaderEmployee = TableColumn<DataColumnEmployee>[];
export type TableHeaderPosition = TableColumn<DataColumnPosition>[];
export type TableHeaderDepartment = TableColumn<DataColumnDepartment>[];
