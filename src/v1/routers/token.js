import { Router } from "express";
import limit from "../limits/setting.limits.js";
import { getTokenForCategory } from "../controllers/generate-tokens.js";

const token = Router();

token.get("/generar/:categoria", limit, getTokenForCategory)

export default token; 