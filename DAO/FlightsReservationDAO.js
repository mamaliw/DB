const FlightsReservation = require('../Model/FlightsReservation')
const db = require('../DB')

async function findById(FlightsReservation_Id) {
    return (await sql.query(`select * from FlightsReservations where FlightsReservation_Id = ${FlightsReservation_Id}`)).recordsets[0][0]
}

async function findByIds(FlightsReservation_Ids) {
    return (await sql.query(`select * from FlightsReservations where FlightsReservation_Id in (${FlightsReservation_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from FlightsReservations`)).recordsets[0]
}

async function deleteById(FlightsReservation_Id) {
    return (await sql.query(`delete from FlightsReservations where FlightsReservation_Id = ${FlightsReservation_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(FlightsReservation_Ids) {
    return (await sql.query(`delete from FlightsReservations where FlightsReservation_Id in (${FlightsReservation_Ids})`)).rowsAffected[0] >= FlightsReservation_Ids.length
}

async function save(FlightsReservation) {
    if (!FlightsReservation){
        throw new Error('Bad FlightsReservation')
    }
    let result = (await sql.query(`select * from FlightsReservations where FlightsReservation_Id = ${FlightsReservation.FlightsReservation_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[FlightsReservations]
   SET [Reservation_Id] = ${FlightsReservation.Reservation_Id}
      ,[Flight_Number] = ${FlightsReservation.Flight_Number}
      ,[User_Id] = ${FlightsReservation.User_Id}
      ,[Passenger_SSN] = ${FlightsReservation.Passenger_SSN}
      ,[Passenger_Age_Class] = ${FlightsReservation.Passenger_Age_Class}
      ,[Passenger_First_Name] = ${FlightsReservation.Passenger_First_Name}
      ,[Passenger_Last_Name] = ${FlightsReservation.Passenger_Last_Name}
      ,[Passenger_SSN] = ${FlightsReservation.Passenger_SSN}
      ,[Passenger_Birthdate] = '${FlightsReservation.Passenger_Birthdate}'
      ,[Passenger_Birth_Country] = ${FlightsReservation.Passenger_Birth_Country}
      ,[Passport_Number] = ${FlightsReservation.Passport_Number}
      ,[Credit_Card_Number] = ${FlightsReservation.Credit_Card_Number}
      ,[Passport_Expire_Date] = '${FlightsReservation.Passport_Expire_Date}'
 WHERE  FlightsReservation_Id = ${FlightsReservation.FlightsReservation_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[FlightsReservations]
           ([Reservation_Id]
           ,[Flight_Number]
           ,[User_Id]
           ,[Passenger_SSN]
           ,[Passenger_Age_Class]
           ,[Passenger_First_Name]
           ,[Passenger_Last_Name]
           ,[Passenger_SSN]
           ,[Passenger_Birthdate]
           ,[Passenger_Birth_Country]
           ,[Passport_Number]
           ,[Credit_Card_Number]
           ,[Passport_Expire_Date])
           OUTPUT Inserted.FlightsReservation_Id
     VALUES
           (
            ${FlightsReservation.Reservation_Id},
            ${FlightsReservation.Flight_Number},
            ${FlightsReservation.User_Id},
            ${FlightsReservation.Passenger_SSN},
            ${FlightsReservation.Passenger_Age_Class},
            ${FlightsReservation.Passenger_First_Name},
            ${FlightsReservation.Passenger_Last_Name},
            ${FlightsReservation.Passenger_SSN},
            '${FlightsReservation.Passenger_Birthdate}',
            ${FlightsReservation.Passenger_Birth_Country},
            ${FlightsReservation.Passport_Number},
            ${FlightsReservation.Credit_Card_Number},
           '${FlightsReservation.Passport_Expire_Date}'
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