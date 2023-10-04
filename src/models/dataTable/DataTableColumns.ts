export interface DataColumUser {
    nombre: string
    apellido: string
    correoElectronico: string
    telefonoMovil: string
    fechaNacimiento: string
    idGenero: number
    idUsuario: string
    idSucursal: number
    requiereCambiarPassword: number
    fotografia: any
    nombreSucursal: string
    idStatusUsuario: number
  }

export interface DataColumBitacora {
    Nombre_Bitacora: string;
    Usuario_Creacion:   string;
    Usuario_Modificacion: string;
    Dispositivo: string;
};
export interface DataColumModulo {
    Nombre_Modulo: string;
    Usuario_Creacion:   string;
    Usuario_Modificacion: string;
};

export interface DataColumRol {
    idRole: number,
    nombre: string    
};
