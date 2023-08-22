import conx from "../../config/db.js"

const getPattients = async (req,res) => {
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

export default getPattients; 