import { ReactNode } from 'react';
import { PeopleCreate, PeopleListResponse, Persona, PersonaResponse } from "./people"

export interface propsAction {
    children: ReactNode
}
export interface props {
    peopleListResponse: PeopleListResponse,
    peopleResponse: PersonaResponse,
    people: Persona,
    getPeoples: (sessionId: string)=> void,
    createPeople: (persona: PeopleCreate, peopleListResponse: PeopleListResponse, sessionId: string) => void,
    updatePeople: (persona: PeopleCreate, peopleListResponse: PeopleListResponse, sessionId: string) => void,
    getPeople: (idPersona: number) => void
}

export const initialState: props = {
    peopleListResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        personas: []
    },
    peopleResponse: {
        strResponseCode: "",
        strResponseMessage: "",
        persona: {
            idPersona: 0,
            nombre: '',
            apellido: '',
            fechaNacimiento: '',
            idGenero: 0,
            genero: '',
            direccion: '',
            telefono: '',
            correoElectronico: '',
            estadoCivil: '',
            idEstadoCivil: 0
        }
    },
    people: {
        idPersona: 0,
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        idGenero: 0,
        genero: '',
        direccion: '',
        telefono: '',
        correoElectronico: '',
        estadoCivil: '',
        idEstadoCivil: 0
    },
    getPeoples(){},
    createPeople(){},
    updatePeople(){},
    getPeople(){}
}