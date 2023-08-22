import express from "express";

// rutes
import token from "./v1/routers/token.js";
import attendants from "./v1/routers/attendants.route.js";
import patients from "./v1/routers/patients.route.js";
import doctor from "./v1/routers/doctor.router.js";
import appointment from "./v1/routers/appointment.route.js"; 

const app = express(); 

/**
 * !middlewares 
 */

app.use(express.json());
app.use(express.text());

/**
 * !Routes
 */

app.use(token); 
app.use(attendants); 
app.use(patients); 
app.use(appointment); 
app.use(doctor)

export default app; 
