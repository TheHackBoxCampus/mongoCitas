import { Router } from "express";
import appointments from "../storage/appointment.js";
import routesVersioning from "express-routes-versioning";
import limit from "../limits/setting.limits.js"
import { validateToken } from "../middleware/validateTokens/jwtVerify.js"

// support version 
import {
    optionsAppointmentsGet,
    optionsAppointmentUserId,
    optionsAppoinmenstForDoctor,
    optionsAppointmentsForConsultingRoom,
    optionsAppoinmenstForDate,
    optionsAppointmentForDateAndDoctor,
    optionsConsultingRooms,
    optionsAppointmentsForGenderAndStatus,
    optionsAppointmentRejected
} from "../support/version1.appointment.js"

/**
  @param appointment = Rute 
  @param version = versions 
 */

let version = routesVersioning();
const appointment = Router(); 


/**
 * ! ROUTES AND THEIR VERSIONS
 */

appointment.get("/citas", limit, validateToken(appointments), version(optionsAppointmentsGet))
appointment.get("/citas/:paciente", limit, validateToken(appointments), version(optionsAppointmentUserId))
appointment.get("/citas/medico/:medico", limit, validateToken(appointments), version(optionsAppoinmenstForDoctor))
appointment.get("/citas/consultorio/:paciente", limit, validateToken(appointments), version(optionsAppointmentsForConsultingRoom))
appointment.get("/fecha/cita", limit, validateToken(appointments), version(optionsAppoinmenstForDate))
appointment.get("/cantidad/citas", limit, validateToken(appointments), version(optionsAppointmentForDateAndDoctor))
appointment.get("/consultorios/citas", limit, validateToken(appointments), version(optionsConsultingRooms))
appointment.get("/genero/citas/:genero", limit, validateToken(appointments), version(optionsAppointmentsForGenderAndStatus))
appointment.get("/fechaCitas/:ano/:mes", limit, validateToken(appointments), version(optionsAppointmentRejected))

export default appointment; 