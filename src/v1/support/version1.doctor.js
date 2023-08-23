// controllers
import {getDoctorForSpecialization,
    getDoctorsAndSpecializations} 
from "../controllers/consults/v1/doctors.js";

/**
 * !VERSIONS
 */

let optionsDoctorForSpecialization = {
    "1.0.0": getDoctorForSpecialization
}

let optionsDoctorsAndSpecializations = {
    "1.0.0": getDoctorsAndSpecializations
}

export {
    optionsDoctorForSpecialization,
    optionsDoctorsAndSpecializations
}