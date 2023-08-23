import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

class patients {
  @Expose({ name: "nombres" })
  @IsDefined({
    message: () => {
      throw "Parametro nombres es necesario!";
    },
  })
  // @Transform(({value}) => {
  //   if(typeof value != "string") throw "tipo de dato incorrecto!"
  //   if(/^[A-Za-z]+ [A-Za-z]+$/.test(value) == false) throw "Parametro nombres incorrecto!" 
  //   return value
  // }, {toClassOnly: true})
  nm: string;

  @Expose({ name: "apellidos" })
  @IsDefined({
    message: () => {
      throw "Parametro apellidos es necesario!";
    },
  })
  // @Transform(({value}) => {
  //   if(typeof value != "string") throw "tipo de dato incorrecto!"
  //   if(/^[A-Za-z]+ [A-Za-z]+$/.test(value) == false) throw "Parametro apellidos incorrecto!" 
  //   return value
  // }, {toClassOnly: true})
  lnm: string;

  @Expose({ name: "telefono" })
  @IsDefined({
    message: () => {
      throw "Parametro telefono es necesario!";
    },
  })
  // @Transform(({value}) => {
  //   if(typeof value != "string") throw "tipo de dato incorrecto!";
  //   if(/^[0-9]+$/.test(value) == false) throw "Parametro telefono incorrecto!";
  //   return value
  // }, {toClassOnly:true}) 
  tl: string;
 
  @Expose({ name: "direccion" })
  @IsDefined({
    message: () => {
      throw "Parametro direccion es necesario!";
    },
  })
  // @Transform(({value}) => {
  //   if(typeof value != "string") throw "tipo de dato incorrecto!"
  //   if(/^(Calle|Carrera|Diagonal)\\s\\d{2}\\s#\\d{2}-\\d{2}\\s[a-zA-Z\\s]+$/.test(value) == false) throw "Parametro direccion incorrecto!"
  //   return value
  // }, {toClassOnly:true})
  dr: string; 

  @Expose({ name: "email" })
  @IsDefined({
    message: () => {
      throw "Parametro email es necesario!";
    },
  })
  // @Transform(({value}) => {
  //   if(typeof value != "string") throw "tipo de dato incorrecto!"
  //   if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) == false) throw "Parametro email incorrecto!"
  //   return value
  // }, {toClassOnly: true})
  em: string;

  @Expose({ name: "tipo_documento" })
  @IsDefined({
    message: () => {
      throw "Parametro tipo_documento es necesario!";
    },
  })
  // @Transform(({value}) => {
  //   if(typeof value != "string") throw "tipp de dato incorrecto!";
  //   return value; 
  // }, {toClassOnly: true})
  tpd: number;

  @Expose({ name: "genero" })
  @IsDefined({
    message: () => {
      throw "Parametro tipo_documento es necesario!";
    },
  })
  // @Transform(({value}) => {
  //   if(typeof value != "string") throw "tipp de dato incorrecto!";
  //   return value; 
  // }, {toClassOnly: true})
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
