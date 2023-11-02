import { Empleado } from "../../context/models/employee/employee";

export enum MODE_ACTION {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE'
}

export interface ICreateModal {
    isOpen: boolean;
    toggleF: Function;
    mode: MODE_ACTION;
    id?: string;
    data?: Empleado;
}