const FlightsForeignStop = require('../Model/FlightsForeignStop')
const db = require('../DB')

async function findById(FlightsForeignStop_Id) {
    return (await sql.query(`select * from FlightsForeignStops where FlightsForeignStop_Id = ${FlightsForeignStop_Id}`)).recordsets[0][0]
}

async function findByIds(FlightsForeignStop_Ids) {
    return (await sql.query(`select * from FlightsForeignStops where FlightsForeignStop_Id in (${FlightsForeignStop_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from FlightsForeignStops`)).recordsets[0]
}

async function deleteById(FlightsForeignStop_Id) {
    return (await sql.query(`delete from FlightsForeignStops where FlightsForeignStop_Id = ${FlightsForeignStop_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(FlightsForeignStop_Ids) {
    return (await sql.query(`delete from FlightsForeignStops where FlightsForeignStop_Id in (${FlightsForeignStop_Ids})`)).rowsAffected[0] >= FlightsForeignStop_Ids.length
}

async function save(FlightsForeignStop) {
    if (!FlightsForeignStop){
        throw new Error('Bad FlightsForeignStop')
    }
    let result = (await sql.query(`select * from FlightsForeignStops where FlightsForeignStop_Id = ${FlightsForeignStop.FlightsForeignStop_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[FlightsForeignStops]
   SET [Flight_Number] = ${FlightsForeignStop.Flight_Number}
      ,[City] = ${FlightsForeignStop.City}
      ,[Terminal] = ${FlightsForeignStop.Terminal}
      ,[Company] = ${FlightsForeignStop.Company}
 WHERE  FlightsForeignStop_Id = ${FlightsForeignStop.FlightsForeignStop_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[FlightsForeignStops]
           ([Flight_Number]
           ,[City]
           ,[Terminal]
           ,[Company])
           OUTPUT Inserted.FlightsForeignStop_Id
     VALUES
           (
            ${FlightsForeignStop.Flight_Number},
            ${FlightsForeignStop.City},
            ${FlightsForeignStop.Terminal},
            ${FlightsForeignStop.Company}
           )
           `)).recordset[0]
}

module.exports = {
    findById,
    findByIds,
    findAll,
    deleteById,
    deleteByIds,
    save
}