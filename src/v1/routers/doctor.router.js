import { Router } from "express";
import doctors from "../storage/doctors.js";
import limit from "../limits/setting.limits.js"; 
import routesVersioning from "express-routes-versioning";
import { validateToken } from "../middleware/validateTokens/jwtVerify.js";
// controllers
import {
    optionsDoctorForSpecialization,
    optionsDoctorsAndSpecializations
} from "../support/version1.doctor.js"

const doctor = Router(); 
const version = routesVersioning(); 

doctor.get("/doctores/:especialidad", limit, validateToken(doctors), version(optionsDoctorForSpecialization))
doctor.get("/doctores/obtener/especializacion", limit, validateToken(doctors), version(optionsDoctorsAndSpecializations))

export default doctor; 