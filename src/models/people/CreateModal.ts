import { Persona } from "../../context/models/people/people";

export enum MODE_ACTION {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE'
}

export interface ICreateModal {
    isOpen: boolean;
    toggleF: Function;
    mode: MODE_ACTION;
    id?: string;
    data?: Persona;
}