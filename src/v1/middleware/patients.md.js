import "reflect-metadata";
import { plainToClass } from "class-transformer";
import patients from "../storage/users.js";
import {validate} from "class-validator"

const patients_md = async (req, res, next) => {
    try {
        if(Object.entries(req.body) < 1) throw "Parametros necesarios"
        else {
            const instance = plainToClass(patients, req.body);
            await validate(instance);
            return next();
        }
    }catch(err) {
        return res.status(500).send({status: 500, message: err})
    }
}

export {
    patients_md,
}