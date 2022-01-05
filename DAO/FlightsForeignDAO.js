const FlightsForeign = require('../Model/FlightsForeign')
const db = require('../DB')

async function findById(Flights_Foreign_Id) {
    return (await sql.query(`select * from Flights_Foreigns where Flights_Foreign_Id = ${Flights_Foreign_Id}`)).recordsets[0][0]
}

async function findByIds(Flights_Foreign_Ids) {
    return (await sql.query(`select * from Flights_Foreigns where Flights_Foreign_Id in (${Flights_Foreign_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from Flights_Foreigns`)).recordsets[0]
}

async function deleteById(Flights_Foreign_Id) {
    return (await sql.query(`delete from Flights_Foreigns where Flights_Foreign_Id = ${Flights_Foreign_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(Flights_Foreign_Ids) {
    return (await sql.query(`delete from Flights_Foreigns where Flights_Foreign_Id in (${Flights_Foreign_Ids})`)).rowsAffected[0] >= Flights_Foreign_Ids.length
}

async function save(FlightsForeign) {
    if (!FlightsForeign){
        throw new Error('Bad FlightsForeign')
    }
    let result = (await sql.query(`select * from Flights_Foreigns where Flights_Foreign_Id = ${FlightsForeign.Flights_Foreign_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[Flights_Foreigns]
   SET [Flight_Number] = ${FlightsForeign.Flight_Number}
      ,[Duration] = '${FlightsForeign.Duration}'
      ,[Origin_Terminal] = ${FlightsForeign.Origin_Terminal}
      ,[Destination_Terminal] = ${FlightsForeign.Destination_Terminal}
 WHERE  Flights_Foreign_Id = ${FlightsForeign.Flights_Foreign_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[Flights_Foreigns]
           ([Flight_Number]
           ,[Duration]
           ,[Origin_Terminal]
           ,[Destination_Terminal])
           OUTPUT Inserted.Flights_Foreign_Id
     VALUES
           (
            ${FlightsForeign.Flight_Number},
            '${FlightsForeign.Duration}',
            ${FlightsForeign.Origin_Terminal},
            ${FlightsForeign.Destination_Terminal}
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