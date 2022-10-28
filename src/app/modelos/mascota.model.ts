export class Mascota {
  id?: string;
  nombre?: string;
  color?: string;
  raza?: string;
  especie?: string;
  estado?: string;
  detalle?: string;
  fechaAfiliacion?: string;
  usuarioId?: string;
  planId?: string;

  public constructor(init?: Partial<Mascota>) {
    Object.assign(this, init);
  }
}
