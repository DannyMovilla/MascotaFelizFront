export class MenuRol {
  id?: string;
  nombre?: string;
  url?: string;
  rol?: string;

  public constructor(init?: Partial<MenuRol>) {
    Object.assign(this, init);
  }
}
