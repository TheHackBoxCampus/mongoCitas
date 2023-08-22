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
class doctors {
    constructor(data) {
        Object.assign(this, data);
        this.nm = "guest";
        this.cn = 0;
        this.es = 0;
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
], doctors.prototype, "nm", void 0);
__decorate([
    Expose({ name: "consultorio" }),
    IsDefined({
        message: () => {
            throw "Parametro consultorio es necesario!";
        },
    }),
    __metadata("design:type", Number)
], doctors.prototype, "cn", void 0);
__decorate([
    Expose({ name: "especialidad" }),
    IsDefined({
        message: () => {
            throw "Parametro especialidad es necesario!";
        },
    }),
    __metadata("design:type", Number)
], doctors.prototype, "es", void 0);
export default doctors;
