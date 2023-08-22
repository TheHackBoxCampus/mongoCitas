import conx from "../../config/db.js";

const getAppointments = async(req, res) => {
    try {
        let db = await conx(); 
        let collection = await db.collection("cita"); 
        let consult = await collection.find().sort({fecha: 1}).toArray(); 
        return res.status(200).send(consult); 
    }catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
}

const getAppointmentsForUserID = async(req, res) => {
    try {
        let patientId = parseInt(req.params.paciente); 
        let db = await conx(); 
        let collection = await db.collection("cita"); 
        let consult = await collection.aggregate([
            {
                $match: {
                    usuario: patientId
                }
            },
            {
                $lookup: {
                    from: "usuario",
                    localField: "usuario",
                    foreignField: "_id",
                    as: "datos_usuario"
                }
            },
            {
                $unwind: "$datos_usuario"
            },
            {
                $lookup: {
                    from: "medico",
                    localField: "medico",
                    foreignField: "_id",
                    as: "datos_medico"
                }
            },
            {
                $unwind: "$datos_medico"
            },
            {
                $project: {
                    _id: 0,
                    datos_usuario: {nombres:1, apellidos: 1},
                    datos_medico: {nombreCompleto: 1},
                    fecha: 1
                }
            }
        ]).toArray(); 
        return res.status(200).send(consult); 
    }catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
}



export {
    getAppointments,
    getAppointmentsForUserID
}; 