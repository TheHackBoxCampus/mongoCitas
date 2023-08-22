import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

class attendants {
  @Expose({ name: "nombreCompleto" })
  @IsDefined({
    message: () => {
      throw "Parametro nombre es necesario!";
    },
  })
  nm: string;

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

  constructor(data: Partial<attendants>) {
    Object.assign(this, data);
    this.nm = "guest";
    this.tl = "0";
    this.dr = "default";
  }
}

export default attendants;
