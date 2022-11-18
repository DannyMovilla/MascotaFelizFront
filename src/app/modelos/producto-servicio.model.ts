export class ProductoServicio {
  id?: string;
  tipo?: string;
  descripcion?: string;
  precio?: string;
  nombre?: string;
  foto?: string;

  public constructor(init?: Partial<ProductoServicio>) {
    Object.assign(this, init);
  }
}
