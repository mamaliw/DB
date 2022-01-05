const FlightsForeignStop = require('../Model/FlightsForeignStop')
const db = require('../DB')

async function findById(Flights_Foreign_Stop_Id) {
    return (await sql.query(`select * from Flights_Foreign_Stops where Flights_Foreign_Stop_Id = ${Flights_Foreign_Stop_Id}`)).recordsets[0][0]
}

async function findByIds(Flights_Foreign_Stop_Ids) {
    return (await sql.query(`select * from Flights_Foreign_Stops where Flights_Foreign_Stop_Id in (${Flights_Foreign_Stop_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from Flights_Foreign_Stops`)).recordsets[0]
}

async function deleteById(Flights_Foreign_Stop_Id) {
    return (await sql.query(`delete from Flights_Foreign_Stops where Flights_Foreign_Stop_Id = ${Flights_Foreign_Stop_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(Flights_Foreign_Stop_Ids) {
    return (await sql.query(`delete from Flights_Foreign_Stops where Flights_Foreign_Stop_Id in (${Flights_Foreign_Stop_Ids})`)).rowsAffected[0] >= Flights_Foreign_Stop_Ids.length
}

async function save(FlightsForeignStop) {
    if (!FlightsForeignStop){
        throw new Error('Bad FlightsForeignStop')
    }
    let result = (await sql.query(`select * from Flights_Foreign_Stops where Flights_Foreign_Stop_Id = ${FlightsForeignStop.Flights_Foreign_Stop_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[Flights_Foreign_Stops]
   SET [Flight_Number] = ${FlightsForeignStop.Flight_Number}
      ,[City] = ${FlightsForeignStop.City}
      ,[Terminal] = ${FlightsForeignStop.Terminal}
      ,[Company] = ${FlightsForeignStop.Company}
 WHERE  Flights_Foreign_Stop_Id = ${FlightsForeignStop.Flights_Foreign_Stop_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[Flights_Foreign_Stops]
           ([Flight_Number]
           ,[City]
           ,[Terminal]
           ,[Company])
           OUTPUT Inserted.Flights_Foreign_Stop_Id
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