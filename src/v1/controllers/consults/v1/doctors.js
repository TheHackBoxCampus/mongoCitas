import conx from "../../../config/db.js";

const getDoctorForSpecialization = async(req, res) => {
    try {
        let specialization = parseInt(req.params.especialidad); 
        let db = await conx(); 
        let collection = await db.collection("medico");
        let consult = await collection.aggregate([
            {
                $match: {
                    especialidad: specialization
                }
            },
            {
                $lookup: {
                    from: "especialidad",
                    localField: "especialidad",
                    foreignField: "_id",
                    as: "especialidad"
                }
            },
            {
                $unwind: "$especialidad"
            },
        
            {
                $project: {
                    _id: 0,
                    nombreCompleto: 1,
                    especialidad: {nombre:1}
                }
            }
        ]).toArray(); 

        return res.status(200).send(consult); 
    }catch (err) {
        res.sendStatus(500);
        console.log(err)
    }
}

const getDoctorsAndSpecializations = async (req, res) => {
    try {
        let db = await conx(); 
        let collection = await db.collection("medico");
        console.log("re")
        let consult = await collection.aggregate([
            {
                $lookup: {
                    from: "especialidad",
                    localField: "especialidad",
                    foreignField: "_id",
                    as: "especialidad"
                }
            },
            {
                $unwind: "$especialidad"
            },
            {
                $project: {
                    _id: 0,
                    nombreCompleto: 1,
                    especialidad: {nombre:1}
                }
            }
        ]).toArray(); 
        return res.status(200).send(consult); 
    }catch (err){
        res.sendStatus(500);
        console.log(err)
    }
}

export {
    getDoctorForSpecialization,
    getDoctorsAndSpecializations
}