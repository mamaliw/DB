const FlightsDomestic = require('../Model/FlightsDomestic')
const db = require('../DB')

async function findById(Flights_Domestic_Id) {
    return (await sql.query(`select * from Flights_Domestics where Flights_Domestic_Id = ${Flights_Domestic_Id}`)).recordsets[0][0]
}

async function findByIds(Flights_Domestic_Ids) {
    return (await sql.query(`select * from Flights_Domestics where Flights_Domestic_Id in (${Flights_Domestic_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from Flights_Domestics`)).recordsets[0]
}

async function deleteById(Flights_Domestic_Id) {
    return (await sql.query(`delete from Flights_Domestics where Flights_Domestic_Id = ${Flights_Domestic_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(Flights_Domestic_Ids) {
    return (await sql.query(`delete from Flights_Domestics where Flights_Domestic_Id in (${Flights_Domestic_Ids})`)).rowsAffected[0] >= Flights_Domestic_Ids.length
}

async function save(FlightsDomestic) {
    if (!FlightsDomestic){
        throw new Error('Bad FlightsDomestic')
    }
    let result = (await sql.query(`select * from Flights_Domestics where Flights_Domestic_Id = ${FlightsDomestic.Flights_Domestic_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[Flights_Domestics]
   SET [Flight_Number] = ${FlightsDomestic.Flight_Number}
      ,[Company] = ${FlightsDomestic.Company}
 WHERE  Flights_Domestic_Id = ${FlightsDomestic.Flights_Domestic_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[Flights_Domestics]
           ([Flight_Number]
           ,[Company])
           OUTPUT Inserted.Flights_Domestic_Id
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