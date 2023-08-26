import conx from "../../../config/db.js";

const getAppointmentsV1 = async (req, res) => {
  try {
    let db = await conx();
    let collection = await db.collection("cita");
    let consult = await collection.find().sort({ fecha: 1 }).toArray();
    return res.status(200).send(consult);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
};

const getAppointmentsForUserIDV1 = async (req, res) => {
  try {
    let patientId = parseInt(req.params.paciente);
    let db = await conx();
    let collection = await db.collection("cita");
    let consult = await collection
      .aggregate([
        {
          $match: {
            usuario: patientId,
          },
        },
        {
          $lookup: {
            from: "usuario",
            localField: "usuario",
            foreignField: "_id",
            as: "datos_usuario",
          },
        },
        {
          $unwind: "$datos_usuario",
        },
        {
          $lookup: {
            from: "medico",
            localField: "medico",
            foreignField: "_id",
            as: "datos_medico",
          },
        },
        {
          $unwind: "$datos_medico",
        },
        {
          $project: {
            _id: 0,
            datos_usuario: { nombres: 1, apellidos: 1 },
            datos_medico: { nombreCompleto: 1 },
            fecha: 1,
          },
        },
      ])
      .toArray();
    return res.status(200).send(consult);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
};

const getAppointmentsForDoctorV1 = async (req, res) => {
  try {
    let doctorId = parseInt(req.params.medico);
    let db = await conx();
    let collection = await db.collection("cita");
    let consult = await collection
      .aggregate([
        {
          $match: {
            medico: doctorId,
          },
        },
        {
          $lookup: {
            from: "medico",
            localField: "medico",
            foreignField: "_id",
            as: "medico",
          },
        },
        {
          $unwind: "$medico",
        },
        {
          $project: {
            _id: 0,
            medico: { nombreCompleto: 1 },
            fecha: 1,
          },
        },
      ])
      .toArray();
    return res.status(200).send(consult);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
};

const getAppointmentForconsultingRoomV1 = async (req, res) => {
  try {
    let patientId = parseInt(req.params.paciente);
    let db = await conx();
    let collection = await db.collection("cita");
    let consult = await collection
      .aggregate([
        {
          $match: {
            usuario: patientId,
          },
        },
        {
          $lookup: {
            from: "usuario",
            localField: "usuario",
            foreignField: "_id",
            as: "datos_usuario",
          },
        },
        {
          $unwind: "$datos_usuario",
        },
        {
          $lookup: {
            from: "medico",
            localField: "medico",
            foreignField: "_id",
            as: "datos_medico",
          },
        },
        {
          $unwind: "$datos_medico",
        },
        {
          $lookup: {
            from: "consultorio",
            localField: "datos_medico.consultorio",
            foreignField: "_id",
            as: "consultorio",
          },
        },
        {
          $unwind: "$consultorio",
        },
        {
          $project: {
            _id: 0,
            datos_usuario: { nombres: 1, apellidos: 1 },
            consultorio: { codigo: 1 },
            fecha: 1,
          },
        },
      ])
      .toArray();
    return res.status(200).send(consult);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
};

const getAppointmentForDateV1 = async (req, res) => {
  try {
    let { fecha } = req.body;
    let db = await conx();
    let collection = await db.collection("cita");
    let consult = await collection
      .aggregate([
        {
          $match: {
            fecha: fecha,
          },
        },
        {
          $project: {
            _id: 0,
            fecha: 1,
            medico: 1,
            usuario: 1,
          },
        },
      ])
      .toArray();
    return res.status(200).send(consult);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
};

const getAppointmentsForDateAndDoctorV1 = async (req, res) => {
  try {
    let { fecha, medico } = req.body;
    let db = await conx();
    let collection = await db.collection("cita");
    let consult = await collection
      .aggregate([
        {
          $match: {
            medico,
            fecha,
          },
        },
        {
          $count: "totalCitas",
        },
      ])
      .toArray();
    return res
      .status(200)
      .send({ id_medico: medico, cantidad: consult[0].totalCitas });
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
};

const getConsultingRoomsV1 = async (req, res) => {
  try {
    let db = await conx();
    let collection = await db.collection("cita");
    let consult = await collection
      .aggregate([
        {
          $lookup: {
            from: "consultorio",
            localField: "medico",
            foreignField: "_id",
            as: "consultorios",
          },
        },
        {
          $unwind: "$consultorios",
        },
        {
          $group: {
            _id: "$usuario",
            consultorios: {
              $addToSet: "$consultorios.codigo",
            },
          },
        },
      ])
      .toArray();
    return res.status(200).send(consult);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
};

const getAppointmentsForGenderAndStatusV1 = async (req, res) => {
  try {
    let genero = req.params.genero;
    let db = await conx();
    let collection = await db.collection("cita");
    let consult = await collection
      .aggregate([
        {
          $lookup: {
            from: "usuario",
            localField: "usuario",
            foreignField: "_id",
            as: "paciente",
          },
        },
        {
          $unwind: "$paciente",
        },
        {
          $lookup: {
            from: "genero",
            localField: "paciente.genero",
            foreignField: "_id",
            as: "genero",
          },
        },
        {
          $unwind: "$genero",
        },
        {
          $lookup: {
            from: "estado_cita",
            localField: "estado",
            foreignField: "_id",
            as: "estado",
          },
        },
        {
          $unwind: "$estado",
        },
        {
          $match: {
            "genero.nombre": genero,
            "estado.nombre": "Atendida",
          },
        },
        {
          $project: {
            _id: 0,
            fecha: 1,
            paciente: {
              _id: "$paciente._id",
              nombre: "$paciente.nombre",
              estado: "$estado.nombre",
            },
          },
        },
      ])
      .toArray();

    return res.status(200).send(consult);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
};

const getAppointmentsRejectedV1 = async (req, res) => {
  try {
    let db = await conx();
    let collection = await db.collection("cita");
    let year = req.params.ano;
    let month = req.params.mes;
    // search
    let consult = await collection
      .aggregate([
        {
          $lookup: {
            from: "usuario",
            localField: "usuario",
            foreignField: "_id",
            as: "usuario"
          }
        },
        {
          $unwind: "$usuario"
        },
        {
          $lookup: {
            from: "estado_cita",
            localField: "estado",
            foreignField: "_id",
            as: "estado"
          }
        },
        {
          $unwind: "$estado"
        },
        {
          $match: {
              $expr: {
                $and: [
                  { $eq: [{ $substr: ["$fecha", 0, 2] }, year] },
                  { $eq: [{ $substr: ["$fecha", 3, 2] }, month] }
                ],
              },
              "estado.nombre" : "Rechazado"
          },
        },
        {
          $project: {
            _id: 0,
            fecha: 1,
            usuario: {nombres: 1},
            estado: {nombre: 1}
          }
        }
      ])
      .toArray();
    return res.status(200).send(consult);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
};

export {
  getAppointmentsV1,
  getAppointmentsForUserIDV1,
  getAppointmentsForDoctorV1,
  getAppointmentForconsultingRoomV1,
  getAppointmentForDateV1,
  getAppointmentsForDateAndDoctorV1,
  getConsultingRoomsV1,
  getAppointmentsForGenderAndStatusV1,
  getAppointmentsRejectedV1
};
