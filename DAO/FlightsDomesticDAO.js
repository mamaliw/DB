const FlightsDomestic = require('../Model/FlightsDomestic')
const db = require('../DB')

async function findById(FlightsDomestic_Id) {
    return (await sql.query(`select * from FlightsDomestics where FlightsDomestic_Id = ${FlightsDomestic_Id}`)).recordsets[0][0]
}

async function findByIds(FlightsDomestic_Ids) {
    return (await sql.query(`select * from FlightsDomestics where FlightsDomestic_Id in (${FlightsDomestic_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from FlightsDomestics`)).recordsets[0]
}

async function deleteById(FlightsDomestic_Id) {
    return (await sql.query(`delete from FlightsDomestics where FlightsDomestic_Id = ${FlightsDomestic_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(FlightsDomestic_Ids) {
    return (await sql.query(`delete from FlightsDomestics where FlightsDomestic_Id in (${FlightsDomestic_Ids})`)).rowsAffected[0] >= FlightsDomestic_Ids.length
}

async function save(FlightsDomestic) {
    if (!FlightsDomestic){
        throw new Error('Bad FlightsDomestic')
    }
    let result = (await sql.query(`select * from FlightsDomestics where FlightsDomestic_Id = ${FlightsDomestic.FlightsDomestic_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[FlightsDomestics]
   SET [Flight_Number] = ${FlightsDomestic.Flight_Number}
      ,[Company] = ${FlightsDomestic.Company}
 WHERE  FlightsDomestic_Id = ${FlightsDomestic.FlightsDomestic_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[FlightsDomestics]
           ([Flight_Number]
           ,[Company])
           OUTPUT Inserted.FlightsDomestic_Id
     VALUES
           (
            ${FlightsDomestic.Flight_Number},
            ${FlightsDomestic.Company}
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