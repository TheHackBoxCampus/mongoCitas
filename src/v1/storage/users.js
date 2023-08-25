var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from "class-transformer";
import { IsDefined, IsString, IsInt, IsEmail } from "class-validator";
class patients {
    constructor(data) {
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
__decorate([
    Expose({ name: "nombres" }),
    IsDefined({
        message: () => {
            throw "Parametro nombres es necesario!";
        },
    }),
    IsString({
        message: () => { throw "tipo de dato incorrecto!"; }
    }),
    __metadata("design:type", String)
], patients.prototype, "nm", void 0);
__decorate([
    Expose({ name: "apellidos" }),
    IsDefined({
        message: () => {
            throw "Parametro apellidos es necesario!";
        },
    }),
    IsString({
        message: () => { throw "tipo de dato incorrecto!"; }
    }),
    __metadata("design:type", String)
], patients.prototype, "lnm", void 0);
__decorate([
    Expose({ name: "telefono" }),
    IsDefined({
        message: () => {
            throw "Parametro telefono es necesario!";
        },
    }),
    IsString({
        message: () => { throw "tipo de dato incorrecto!"; }
    }),
    __metadata("design:type", String)
], patients.prototype, "tl", void 0);
__decorate([
    Expose({ name: "direccion" }),
    IsDefined({
        message: () => {
            throw "Parametro direccion es necesario!";
        },
    }),
    IsString({
        message: () => { throw "tipo de dato incorrecto!"; }
    }),
    __metadata("design:type", String)
], patients.prototype, "dr", void 0);
__decorate([
    Expose({ name: "email" }),
    IsDefined({
        message: () => {
            throw "Parametro email es necesario!";
        },
    }),
    IsString({
        message: () => { throw "tipo de dato incorrecto!"; }
    }),
    IsEmail(undefined, {
        message: () => { throw "Parametro email incorrecto!"; }
    }),
    __metadata("design:type", String)
], patients.prototype, "em", void 0);
__decorate([
    Expose({ name: "tipo_documento" }),
    IsDefined({
        message: () => {
            throw "Parametro tipo_documento es necesario!";
        },
    }),
    IsInt({
        message: () => { throw "tipo de dato incorrecto!"; }
    }),
    __metadata("design:type", Number)
], patients.prototype, "tpd", void 0);
__decorate([
    Expose({ name: "genero" }),
    IsDefined({
        message: () => {
            throw "Parametro genero es necesario!";
        },
    }),
    IsInt({
        message: () => { throw "tipo de dato incorrecto!"; }
    }),
    __metadata("design:type", Number)
], patients.prototype, "g", void 0);
__decorate([
    Expose({ name: "acudiente" }),
    __metadata("design:type", Number)
], patients.prototype, "att", void 0);
export default patients;
