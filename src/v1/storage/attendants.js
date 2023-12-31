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
class attendants {
    constructor(data) {
        Object.assign(this, data);
        this.nm = "guest";
        this.tl = "0";
        this.dr = "default";
    }
}
__decorate([
    Expose({ name: "nombreCompleto" }),
    IsDefined({
        message: () => {
            throw "Parametro nombre es necesario!";
        },
    }),
    __metadata("design:type", String)
], attendants.prototype, "nm", void 0);
__decorate([
    Expose({ name: "telefono" }),
    IsDefined({
        message: () => {
            throw "Parametro telefono es necesario!";
        },
    }),
    __metadata("design:type", String)
], attendants.prototype, "tl", void 0);
__decorate([
    Expose({ name: "direccion" }),
    IsDefined({
        message: () => {
            throw "Parametro direccion es necesario!";
        },
    }),
    __metadata("design:type", String)
], attendants.prototype, "dr", void 0);
export default attendants;
