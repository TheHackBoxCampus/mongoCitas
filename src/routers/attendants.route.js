import { Router } from "express";
import acudiente from "../storage/attendants.js"
import limit from "../limits/setting.limits.js"
import { validateToken } from "../middleware/validateTokens/jwtVerify.js";

const attendants = Router(); 

attendants.get("/acudientes", limit, validateToken(acudiente), (req,res) => res.send("hellor wrol2l"))

export default attendants; 