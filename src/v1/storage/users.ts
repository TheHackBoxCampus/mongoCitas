import { Expose } from "class-transformer";
import { IsDefined, IsString, IsInt, IsEmail } from "class-validator";

class patients {
  @Expose({ name: "nombres" })
  @IsDefined({
    message: () => {
      throw "Parametro nombres es necesario!";
    },
  })
  @IsString({
    message: () => { throw "tipo de dato incorrecto!" }
  })
  nm: string;

  @Expose({ name: "apellidos" })
  @IsDefined({
    message: () => {
      throw "Parametro apellidos es necesario!";
    },
  })
  @IsString({
    message: () => { throw "tipo de dato incorrecto!" }
  })
  lnm: string;

  @Expose({ name: "telefono" })
  @IsDefined({
    message: () => {
      throw "Parametro telefono es necesario!";
    },
  })
  @IsString({
    message: () => { throw "tipo de dato incorrecto!" }
  })
  tl: string;

  @Expose({ name: "direccion" })
  @IsDefined({
    message: () => {
      throw "Parametro direccion es necesario!";
    },
  })
  @IsString({
    message: () => { throw "tipo de dato incorrecto!" }
  })
  dr: string;

  @Expose({ name: "email" })
  @IsDefined({
    message: () => {
      throw "Parametro email es necesario!";
    },
  })
  @IsString({
    message: () => { throw "tipo de dato incorrecto!" }
  })

  @IsEmail(undefined, {
    message: () => {throw "Parametro email incorrecto!"}
  })
  em: string;

  @Expose({ name: "tipo_documento" })
  @IsDefined({
    message: () => {
      throw "Parametro tipo_documento es necesario!";
    },
  })
  @IsInt({
    message: () => { throw "tipo de dato incorrecto!" }
  })
  tpd: number;

  @Expose({ name: "genero" })
  @IsDefined({
    message: () => {
      throw "Parametro genero es necesario!";
    },
  })
  @IsInt({
    message: () => { throw "tipo de dato incorrecto!" }
  })
  g: number;

  @Expose({ name: "acudiente" })
  att?: number;

  constructor(data: Partial<patients>) {
    Object.assign(this, data);
    this.nm = "guest";
    this.lnm = "lastguest";
    this.tl = "0";
    this.dr = "default";
    this.em = "example@gmail.com";
    this.tpd = 0;
    this.g = 0;
  }
}

export default patients;
