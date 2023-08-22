// structures
import attendants from "../storage/attendants.js"
import patients from "../storage/users.js"
import appointments from "../storage/appointment.js";
import doctors from "../storage/doctors.js"
// packages
import { classToPlain, plainToClass } from "class-transformer";
import jwt from "jsonwebtoken";
// global enviroments
import enviroments from "../env/env.js"

const getClass = (cls) => {
    let optionsOFClass = {
        "acudientes" : attendants, 
        "pacientes": patients, 
        "citas": appointments,
        "medicos": doctors
    }

    let isMatch = optionsOFClass[cls];
    if(!isMatch) throw "Categoria invalida!"
    else return {attributes: plainToClass(isMatch, {}, {ignoreDecorators: true})}
}

const getTokenForCategory = async (req, res) => {
    try {
        let data = getClass(req.params.categoria).attributes; 
        let structure = classToPlain(data); 
        let token = new Promise((resolve, reject) => {
            jwt.sign(structure, enviroments.KEY, {expiresIn: "10m"}, (err, token) => {
                err ? reject(err) : resolve(token)
            })
        })
        let restoken = await token; 
        return res.status(200).send({status: 200, restoken, category: req.params.categoria})
    }catch(err) {
        res.status(500).send({status: 500, message: err})
    }
}

export {
    getTokenForCategory
}


