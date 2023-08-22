import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

class patients {
  @Expose({ name: "nombre" })
  @IsDefined({
    message: () => {
      throw "Parametro nombre es necesario!";
    },
  })
  nm: string;

  @Expose({ name: "segundo_nombre" })
  @IsDefined({
    message: () => {
      throw "Parametro segundo nombre es necesario!";
    },
  })
  snm: string;
  @Expose({ name: "apellido" })
  @IsDefined({
    message: () => {
      throw "Parametro apellido es necesario!";
    },
  })
  lnm: string;

  @Expose({ name: "segundo_apellido" })
  @IsDefined({
    message: () => {
      throw "Parametro segundo apellido es necesario!";
    },
  })
  slnm: string;

  @Expose({ name: "telefono" })
  @IsDefined({
    message: () => {
      throw "Parametro telefono es necesario!";
    },
  })
  tl: string;

  @Expose({ name: "direccion" })
  @IsDefined({
    message: () => {
      throw "Parametro direccion es necesario!";
    },
  })
  dr: string;

  @Expose({ name: "email" })
  @IsDefined({
    message: () => {
      throw "Parametro email es necesario!";
    },
  })
  em: string;

  @Expose({ name: "tipo_documento" })
  @IsDefined({
    message: () => {
      throw "Parametro tipo_documento es necesario!";
    },
  })
  tpd: number;

  @Expose({ name: "genero" })
  @IsDefined({
    message: () => {
      throw "Parametro tipo_documento es necesario!";
    },
  })
  g: number;

  @Expose({ name: "acudiente" })
  att?: number;

  constructor(data: Partial<patients>) {
    Object.assign(this, data);
    this.nm = "guest";
    this.snm = "guest2";
    this.lnm = "lastguest";
    this.slnm = "lastguest2";
    this.tl = "0";
    this.dr = "default";
    this.em = "example@gmail.com";
    this.tpd = 0;
    this.g = 0;
  }
}

export default patients;
