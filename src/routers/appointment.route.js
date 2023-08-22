import { Router } from "express";
import appointments from "../storage/appointment.js";
import limit from "../limits/setting.limits.js"
import { validateToken } from "../middleware/validateTokens/jwtVerify.js"
import {getAppointments, getAppointmentsForUserID} from "../controllers/consults/appointment.js";

const appointment = Router(); 

appointment.get("/citas", limit, validateToken(appointments), getAppointments)
appointment.get("/citas/:paciente", limit, validateToken(appointments), getAppointmentsForUserID)

export default appointment; 