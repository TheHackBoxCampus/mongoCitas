import { Router } from "express";
import usuario from "../storage/users.js"
import limit from "../limits/setting.limits.js"
import { validateToken } from "../middleware/validateTokens/jwtVerify.js";
import {getPattientsV1} from "../controllers/consults/v1/patients.js";

const patients = Router(); 

patients.get("/pacientes", limit, validateToken(usuario), getPattientsV1)

export default patients; 