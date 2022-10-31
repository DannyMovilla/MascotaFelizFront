export class Rol {
  id?: string;
  codigo?: string;
  nombre?: string;

  public constructor(init?: Partial<Rol>) {
    Object.assign(this, init);
  }
}
