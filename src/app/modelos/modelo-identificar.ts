import { DatosLogin } from "./datos-login";

export class ModeloIdentificar {
  datos?: DatosLogin;
  tk?: String;
  rolUsuario?: String;
  estaIdentificado: boolean = false;
}
