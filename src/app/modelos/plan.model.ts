export class Plan {
  id?: string;
  nombre?: string;
  descripcion?: string;
  precio?: string;

  public constructor(init?: Partial<Plan>) {
    Object.assign(this, init);
  }
}
