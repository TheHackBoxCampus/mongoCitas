import { Router } from "express";
import usuario from "../storage/users.js"
import limit from "../limits/setting.limits.js"
import routesVersioning from "express-routes-versioning";
import { patients_md} from "../middleware/patients.md.js";
import { validateToken } from "../middleware/validateTokens/jwtVerify.js";
import {
     optionsPatients,
     optionsPushPatients
} from "../support/version1.patients.js"

const patients = Router(); 
const version = routesVersioning(); 

patients.get("/pacientes", limit, validateToken(usuario), version(optionsPatients))
patients.post("/pacientes", limit, validateToken(usuario), patients_md,  version(optionsPushPatients))

export default patients; 