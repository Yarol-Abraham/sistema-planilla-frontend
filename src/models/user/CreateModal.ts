import { UsuarioCreate } from "../../context/models/user/user";

export enum MODE_ACTION {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE'
}

export interface ICreateModal {
    isOpen: boolean;
    toggleF: Function;
    mode: MODE_ACTION;
    id?: string;
    data?: UsuarioCreate;
}