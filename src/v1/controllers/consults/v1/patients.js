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

            "default": () => { return {
                status: 201,
                message: "registro exitoso!"
            }}
        }
        // verify age
        let match = `${data.acudiente ? true : false}-${data.tipo_documento < 1 || data.tipo_documento > 2 ? false : data.tipo_documento}`;
        let validate = responses[match] ? true : false
        let response = validate ? responses[match]() : responses["default"](); 
 
        
        // verify gender
        let gender = `${data.genero > 2 || data.genero < 1 ? false : true}`  
        let genderOptions = {
            "false":  () => { throw {
                status: 400,
                message: "El valor genero no cumple con los estandares!"
            }},
        }
        let existOption = genderOptions[gender] ? true : false
        let resposeGender = existOption ? genderOptions[gender]() : responses["default"]();  
        existOption ? response = resposeGender : response = response
        
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
        }else { res.status(400).send(err == "" ? err.message : err)}
    }
}

export {    
    getPattientsV1,
    pushNewPatientV1
} 