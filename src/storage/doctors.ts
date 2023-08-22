import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

class doctors {
  @Expose({ name: "nombreCompleto" })
  @IsDefined({
    message: () => {
      throw "Parametro nombre es necesario!";
    },
  })
  nm: string;

  @Expose({ name: "consultorio" })
  @IsDefined({
    message: () => {
      throw "Parametro consultorio es necesario!";
    },
  })
  cn: number;

  @Expose({ name: "especialidad" })
  @IsDefined({
    message: () => {
      throw "Parametro especialidad es necesario!";
    },
  })
  es: number;

  constructor(data: Partial<doctors>) {
    Object.assign(this, data);
    this.nm = "guest";
    this.cn = 0;
    this.es = 0;
  }
}

export default doctors;