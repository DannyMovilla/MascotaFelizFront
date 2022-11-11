import { Plan } from "./plan.model";
import { Usuario } from "./usuario.model";

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
  foto?: string;
  plan?: Plan;
  usuario?: Usuario;

  public constructor(init?: Partial<Mascota>) {
    Object.assign(this, init);
  }
}
