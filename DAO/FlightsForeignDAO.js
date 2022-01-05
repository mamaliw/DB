const FlightsForeign = require('../Model/FlightsForeign')
const db = require('../DB')

async function findById(FlightsForeign_Id) {
    return (await sql.query(`select * from FlightsForeigns where FlightsForeign_Id = ${FlightsForeign_Id}`)).recordsets[0][0]
}

async function findByIds(FlightsForeign_Ids) {
    return (await sql.query(`select * from FlightsForeigns where FlightsForeign_Id in (${FlightsForeign_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from FlightsForeigns`)).recordsets[0]
}

async function deleteById(FlightsForeign_Id) {
    return (await sql.query(`delete from FlightsForeigns where FlightsForeign_Id = ${FlightsForeign_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(FlightsForeign_Ids) {
    return (await sql.query(`delete from FlightsForeigns where FlightsForeign_Id in (${FlightsForeign_Ids})`)).rowsAffected[0] >= FlightsForeign_Ids.length
}

async function save(FlightsForeign) {
    if (!FlightsForeign){
        throw new Error('Bad FlightsForeign')
    }
    let result = (await sql.query(`select * from FlightsForeigns where FlightsForeign_Id = ${FlightsForeign.FlightsForeign_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[FlightsForeigns]
   SET [Flight_Number] = ${FlightsForeign.Flight_Number}
      ,[Duration] = '${FlightsForeign.Duration}'
      ,[Origin_Terminal] = ${FlightsForeign.Origin_Terminal}
      ,[Destination_Terminal] = ${FlightsForeign.Destination_Terminal}
 WHERE  FlightsForeign_Id = ${FlightsForeign.FlightsForeign_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[FlightsForeigns]
           ([Flight_Number]
           ,[Duration]
           ,[Origin_Terminal]
           ,[Destination_Terminal])
           OUTPUT Inserted.FlightsForeign_Id
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