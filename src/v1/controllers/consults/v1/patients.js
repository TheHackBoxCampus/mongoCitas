import conx from "../../../config/db.js"

const getPattientsV1 = async (req,res) => {
    try {
        let db = await conx(); 
        let collection = await db.collection("usuario"); 
        let consult = await collection.find().sort({nombres: 1}).toArray(); 
        return res.status(200).send(consult); 
    }catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
}

const pushNewPatientV1 = async (req, res) => {
    try {
        
    }catch(err) {

    }
}

export {
    getPattientsV1,
    pushNewPatientV1
} 