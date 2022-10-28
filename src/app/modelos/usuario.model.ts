import { Rol } from "./rol.model";

export class Usuario {
  id?: string;
  nombres?: string;
  apellidos?: string;
  correo?: string;
  documento?: string;
  contrasena?: string;
  foto?: string;
  rolId?: string;
  rol?: Rol;

  public constructor(init?: Partial<Usuario>) {
    Object.assign(this, init);
  }
}
