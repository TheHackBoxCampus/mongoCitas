import { Router } from "express";
import doctors from "../storage/doctors.js";
import limit from "../limits/setting.limits.js"; 
import { validateToken } from "../middleware/validateTokens/jwtVerify.js";
// controllers
import {getDoctorForSpecialization,
       getDoctorsAndSpecializations} 
from "../controllers/consults/v1/doctors.js";

const doctor = Router(); 

doctor.get("/doctores/:especialidad", limit, validateToken(doctors), getDoctorForSpecialization)
doctor.get("/doctores/obtener/especializacion", limit, validateToken(doctors), getDoctorsAndSpecializations)

export default doctor; 