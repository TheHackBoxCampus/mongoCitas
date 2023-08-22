import { Router } from "express";
import routesVersioning from "express-routes-versioning"
import appointments from "../storage/appointment.js";
import limit from "../limits/setting.limits.js"
import { validateToken } from "../middleware/validateTokens/jwtVerify.js"
// controllers
import {getAppointmentsV1, 
        getAppointmentsForUserIDV1, 
        getAppointmentsForDoctorV1,
        getAppointmentForconsultingRoomV1,
        getAppointmentForDateV1,
        getAppointmentsForDateAndDoctorV1,
        getConsultingRoomsV1,
        getAppointmentsForGenderAndStatusV1
} from "../controllers/consults/v1/appointment.js";

const appointment = Router(); 
let version = routesVersioning(); 

/**
 * ! VERSIONS
 */

// getting data from collections of mongo 
let optionsAppointmentsGet = {
    "~1.0.0": getAppointmentsV1
}

// getting data from collection of mongo for user ID 
let optionsAppointmentUserId = {
    "~1.0.0": getAppointmentsForUserIDV1
}

// getting data from collection of mongo for doctor
let optionsAppoinmenstForDoctor = {
    "~1.0.0": getAppointmentsForDoctorV1
}

/**
 * ! ROUTES AND THEIR VERSIONS
 */

appointment.get("/citas", limit, validateToken(appointments), version(optionsAppointmentsGet))
appointment.get("/citas/:paciente", limit, validateToken(appointments), version(optionsAppointmentUserId))
appointment.get("/citas/medico/:medico", limit, validateToken(appointments), version(optionsAppoinmenstForDoctor))
appointment.get("/citas/consultorio/:paciente", limit, validateToken(appointments), getAppointmentForconsultingRoom)
appointment.get("/fecha/cita", limit, validateToken(appointments), getAppointmentForDate)
appointment.get("/cantidad/citas", limit, validateToken(appointments), getAppointmentsForDateAndDoctor)
appointment.get("/consultorios/citas", limit, validateToken(appointments), getConsultingRooms)
appointment.get("/genero/citas/:genero", limit, validateToken(appointments), getAppointmentsForGenderAndStatus)

export default appointment; 