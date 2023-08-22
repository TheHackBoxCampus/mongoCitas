import { Router } from "express";
import usuario from "../storage/users.js"
import limit from "../limits/setting.limits.js"
import { validateToken } from "../middleware/validateTokens/jwtVerify.js";
import getPattients from "../controllers/consults/patients.js";

const patients = Router(); 

patients.get("/pacientes", limit, validateToken(usuario), getPattients)

export default patients; 