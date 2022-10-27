export class Usuario {
  id?: string;
  nombres?: string;
  apellidos?: string;
  correo?: string;
  documento?: string;
  contrasena?: string;
  foto?: string;
  rolId?: string;

  public constructor(init?: Partial<Usuario>) {
    Object.assign(this, init);
  }
}
