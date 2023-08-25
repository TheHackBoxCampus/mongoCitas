import { classToPlain, plainToClass } from "class-transformer";
import passport from "../../passport/settings.passport.js";

const isEqual = (cls, decoded) => {
    let ref = JSON.stringify({...decoded})
    let copy = JSON.stringify(classToPlain(plainToClass(cls, {}, {ignoreDecorators: true})));
    let verify = copy === ref; 
    return verify
}

const validateToken = (cls) => (req, res, next) => {
    passport.authenticate("bearer", {session: false}, (err, decoded) => {
        if(err) res.status(401).send({status: 401, message: "Error en la autenticacion!"})
        else {
            let filter = Object.entries(decoded).map(p => p[0] != "iat" && p[0] != "exp" ? p : false).filter(Boolean); 
            let reformate = Object.fromEntries(filter); 
            let response = isEqual(cls, reformate);
            // responses
            return response ? next() : res.status(403).send({status: 403, message: "Token invalido!"})
        }
    })(req, res, next)
}

export {
    validateToken
}