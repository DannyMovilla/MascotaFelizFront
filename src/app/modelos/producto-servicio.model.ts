export class ProductoServicio {
  id?: string;
  tipo?: string;
  descripcion?: string;
  precio?: string;

  public constructor(init?: Partial<ProductoServicio>) {
    Object.assign(this, init);
  }
}
