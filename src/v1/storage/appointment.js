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
import { IsDefined } from "class-validator";
class appointments {
    constructor(data) {
        Object.assign(this, data);
        this.fec = "yy/mm/dd";
        this.e = 0;
        this.m = 0;
        this.us = 0;
    }
}
__decorate([
    Expose({ name: "fecha" }),
    IsDefined({
        message: () => {
            throw "Parametro nombre es necesario!";
        },
    }),
    __metadata("design:type", String)
], appointments.prototype, "fec", void 0);
__decorate([
    Expose({ name: "estado" }),
    IsDefined({
        message: () => {
            throw "Parametro estado es necesario!";
        },
    }),
    __metadata("design:type", Number)
], appointments.prototype, "e", void 0);
__decorate([
    Expose({ name: "medico" }),
    IsDefined({
        message: () => {
            throw "Parametro medico es necesario!";
        },
    }),
    __metadata("design:type", Number)
], appointments.prototype, "m", void 0);
__decorate([
    Expose({ name: "usuario" }),
    IsDefined({
        message: () => {
            throw "Parametro datos de usuario es necesario!";
        },
    }),
    __metadata("design:type", Number)
], appointments.prototype, "us", void 0);
export default appointments;
