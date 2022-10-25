export class Usuario {
  id?: string;
  nombres?: string;
  apellidos?: string;
  direccion?: string;
  celular?: string;
  correo?: string;
  documento?: string;
  tipoDocumento?: string;
  contrasena?: string;
  foto?: string;
  rolId?: string;

  public constructor(init?: Partial<Usuario>) {
    Object.assign(this, init);
  }
}
