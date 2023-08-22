import { Router } from "express";
import doctors from "../storage/doctors.js";
import limit from "../limits/setting.limits.js"; 
import getDoctorForSpecialization from "../controllers/consults/doctors.js";
import { validateToken } from "../middleware/validateTokens/jwtVerify.js";

const doctor = Router(); 

doctor.get("/doctores/:especialidad", limit, validateToken(doctors), getDoctorForSpecialization)

export default doctor; 