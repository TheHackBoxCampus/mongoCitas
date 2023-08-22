import express from "express";

// rutes
import token from "./routers/token.js";
import attendants from "./routers/attendants.route.js";
import patients from "./routers/patients.route.js";
import doctor from "./routers/doctor.router.js";
import appointment from "./routers/appointment.route.js"; 

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
