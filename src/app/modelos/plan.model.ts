import { Mascota } from "./mascota.model";

export class Plan {
  id?: string;
  nombre?: string;
  descripcion?: string;
  precio?: string;
  mascotas?: Mascota[];

  public constructor(init?: Partial<Plan>) {
    Object.assign(this, init);
  }
}
