import { getPattientsV1, pushNewPatientV1 } from "../controllers/consults/v1/patients.js";

/**
 * !VERSIONS
 */ 

let optionsPatients = {
    "1.0.0": getPattientsV1
}

let optionsPushPatients = {
    "1.0.0": pushNewPatientV1
}

export {
    optionsPatients, 
    optionsPushPatients
}

