import conx from "../../../config/db.js"
import { generate } from "../../../libs/generateId.js";
import { errs } from "../../../libs/mongo.js";

const getPattientsV1 = async (req, res) => {
    try {
        let db = await conx();
        let collection = await db.collection("usuario");
        let consult = await collection.find().sort({ nombres: 1 }).toArray();
        return res.status(200).send(consult);
    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
}

const pushNewPatientV1 = async (req, res) => {
    try {
        let data = req.body;
        let db = await conx();
        let collection = await db.collection("usuario");
        let id = await generate();

        let responses = {
            "true-1": () => { throw {
                status: 500,
                message: "Eres mayor de edad, no es necesario que envies a un acudiente!"
            }},
            
            "false-2": () => { throw {
                status: 500,
                message: "Eres menor de edad registra a un acudiente!"
            }},
            
            "true-false": () => { throw {
                status: 400,
                message: "El valor tipo_documento no cumple con los estandares!"
            }},
            
            "false-false": () => { throw {
                status: 400,
                message: "El valor tipo_documento no cumple con los estandares!"
            }},

            "false":  () => { throw {
                status: 400,
                message: "El valor genero no cumple con los estandares!"
            }},

            "default": () => { return {
                status: 201,
                message: "registro exitoso!"
            }}
        }
        // verify age
        // TODO: Resolver el bug de genero
        let gender = `${data.genero < 1 || data.genero > 2 ? false : true}`
        let match = `${data.acudiente ? true : false}-${data.tipo_documento < 1 || data.tipo_documento > 2 ? false : data.tipo_documento}`;
        let validate = responses[match] || responses[gender] ? true : false
        let response = validate ? responses[match]() || responses[gender]() : responses["default"]() ; 
        let {...registers} = data;
 
        // insert 
        await collection.insertOne({
            _id: parseInt(id), 
            ...registers
        })

        res.send(response)
     
    } catch (err) {
        if(err.code == 121){
            let {errInfo: {details: {schemaRulesNotSatisfied: [{operatorName}]}}} = err
            let prop = errs[operatorName]
            res.send(prop)
        }else { res.send(err == "" ? err.message : err.message)}
    }
}

export {    
    getPattientsV1,
    pushNewPatientV1
} 