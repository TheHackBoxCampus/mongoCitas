import { Router } from "express";
import appointments from "../storage/appointment.js";
import limit from "../limits/setting.limits.js"
import { validateToken } from "../middleware/validateTokens/jwtVerify.js"
// controllers
import {getAppointments, 
        getAppointmentsForUserID, 
        getAppointmentsForDoctor,
        getAppointmentForconsultingRoom,
        getAppointmentForDate,
        getAppointmentsForDateAndDoctor,
        getConsultingRooms,
        getAppointmentsForGenderAndStatus
} from "../controllers/consults/appointment.js";

const appointment = Router(); 

appointment.get("/citas", limit, validateToken(appointments), getAppointments)
appointment.get("/citas/:paciente", limit, validateToken(appointments), getAppointmentsForUserID)
appointment.get("/citas/medico/:medico", limit, validateToken(appointments), getAppointmentsForDoctor)
appointment.get("/citas/consultorio/:paciente", limit, validateToken(appointments), getAppointmentForconsultingRoom)
appointment.get("/fecha/cita", limit, validateToken(appointments), getAppointmentForDate)
appointment.get("/cantidad/citas", limit, validateToken(appointments), getAppointmentsForDateAndDoctor)
appointment.get("/consultorios/citas", limit, validateToken(appointments), getConsultingRooms)
appointment.get("/genero/citas/:genero", limit, validateToken(appointments), getAppointmentsForGenderAndStatus)

export default appointment; 