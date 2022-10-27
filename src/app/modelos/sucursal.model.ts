export class Sucursal {
  id?: string;
  departamento?: string;
  ciudad?: string;
  direccion?: string;

  public constructor(init?: Partial<Sucursal>) {
    Object.assign(this, init);
  }
}
