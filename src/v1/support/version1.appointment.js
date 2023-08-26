import {
  getAppointmentsV1,
  getAppointmentsForUserIDV1,
  getAppointmentsForDoctorV1,
  getAppointmentForconsultingRoomV1,
  getAppointmentForDateV1,
  getAppointmentsForDateAndDoctorV1,
  getConsultingRoomsV1,
  getAppointmentsForGenderAndStatusV1,
  getAppointmentsRejectedV1
} from "../controllers/consults/v1/appointment.js";

/**
 * ! VERSIONS
 */

// ? getting data from collections of mongo
let optionsAppointmentsGet = {
  "1.0.0": getAppointmentsV1
};

// ? getting data from collection of mongo for user ID
let optionsAppointmentUserId = {
  "1.0.0": getAppointmentsForUserIDV1,
};

// ? getting data from collection of mongo for doctor
let optionsAppoinmenstForDoctor = {
  "1.0.0": getAppointmentsForDoctorV1,
};

// ? getting data from collection of mongo for user and consulting room 
let optionsAppointmentsForConsultingRoom = {
  "1.0.0": getAppointmentForconsultingRoomV1,
};

// ? getting data from collection of mongo for Date
let optionsAppoinmenstForDate = {
  "1.0.0": getAppointmentForDateV1
}

// ? getting data from collection of mongo for Date and doctor
let optionsAppointmentForDateAndDoctor = {
  "1.0.0": getAppointmentsForDateAndDoctorV1
}

// ? getting data from collection of mongo for consulting room 
let optionsConsultingRooms = {
  "1.0.0": getConsultingRoomsV1
}

// ? getting data from collection of mongo for gender and status
let optionsAppointmentsForGenderAndStatus = {
  "1.0.0": getAppointmentsForGenderAndStatusV1
}

let optionsAppointmentRejected = {
  "1.0.0": getAppointmentsRejectedV1
}


export  {
    optionsAppointmentsGet,
    optionsAppointmentUserId,
    optionsAppoinmenstForDoctor,
    optionsAppointmentsForConsultingRoom,
    optionsAppoinmenstForDate,
    optionsAppointmentForDateAndDoctor,
    optionsConsultingRooms,
    optionsAppointmentsForGenderAndStatus,
    optionsAppointmentRejected
}