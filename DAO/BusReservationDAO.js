const BusReservation = require('../Model/BusReservation')
const db = require('../DB')

async function findById(BusReservation_Id) {
    return (await sql.query(`select * from BusReservations where BusReservation_Id = ${BusReservation_Id}`)).recordsets[0][0]
}

async function findByIds(BusReservation_Ids) {
    return (await sql.query(`select * from BusReservations where BusReservation_Id in (${BusReservation_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from BusReservations`)).recordsets[0]
}

async function deleteById(BusReservation_Id) {
    return (await sql.query(`delete from BusReservations where BusReservation_Id = ${BusReservation_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(BusReservation_Ids) {
    return (await sql.query(`delete from BusReservations where BusReservation_Id in (${BusReservation_Ids})`)).rowsAffected[0] >= BusReservation_Ids.length
}

async function save(BusReservation) {
    if (!BusReservation){
        throw new Error('Bad BusReservation')
    }
    let result = (await sql.query(`select * from BusReservations where BusReservation_Id = ${BusReservation.BusReservation_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[BusReservations]
   SET [Reservation_Id] = ${BusReservation.Reservation_Id}
      ,[Trip_Number] = ${BusReservation.Trip_Number}
      ,[User_Id] = ${BusReservation.User_Id}
      ,[Is_Head_Passenger] = ${BusReservation.Is_Head_Passenger}
      ,[Passenger_Phone] = ${BusReservation.Passenger_Phone}
      ,[Passenger_First_Name] = ${BusReservation.Passenger_First_Name}
      ,[Passenger_Last_Name] = ${BusReservation.Passenger_Last_Name}
      ,[Passenger_SSN] = ${BusReservation.Passenger_SSN}
      ,[Seat_Number] = ${BusReservation.Seat_Number}
 WHERE  BusReservation_Id = ${BusReservation.BusReservation_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[BusReservations]
           ([Reservation_Id]
           ,[Trip_Number]
           ,[User_Id]
           ,[Is_Head_Passenger]
           ,[Passenger_Phone]
           ,[Passenger_First_Name]
           ,[Passenger_Last_Name]
           ,[Passenger_SSN]
           ,[Seat_Number])
           OUTPUT Inserted.BusReservation_Id
     VALUES
           (
            ${BusReservation.Reservation_Id},
            ${BusReservation.Trip_Number},
            ${BusReservation.User_Id},
            ${BusReservation.Is_Head_Passenger},
            ${BusReservation.Passenger_Phone},
            ${BusReservation.Passenger_First_Name},
            ${BusReservation.Passenger_Last_Name},
            ${BusReservation.Passenger_SSN},
            ${BusReservation.Seat_Number}
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