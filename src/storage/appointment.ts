import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

class appointments {
  @Expose({ name: "fecha" })
  @IsDefined({
    message: () => {
      throw "Parametro nombre es necesario!";
    },
  })
  fec: string;

  @Expose({ name: "estado" })
  @IsDefined({
    message: () => {
      throw "Parametro estado es necesario!";
    },
  })
  e: number;

  @Expose({ name: "medico" })
  @IsDefined({
    message: () => {
      throw "Parametro medico es necesario!";
    },
  })
  m: number;

  @Expose({ name: "usuario" })
  @IsDefined({
    message: () => {
      throw "Parametro datos de usuario es necesario!";
    },
  })
  us: number;

  constructor(data: Partial<appointments>) {
    Object.assign(this, data);
    this.fec = "yy/mm/dd";
    this.e = 0;
    this.m = 0;
    this.us = 0
  }
}

export default appointments;
