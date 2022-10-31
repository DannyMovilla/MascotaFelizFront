export class Prospectos {
  id?: string;
  nombres?: string = '';
  mensaje?: string = '';
  correo?: string = '';

  public constructor(init?: Partial<Prospectos>) {
    Object.assign(this, init);
  }
}
