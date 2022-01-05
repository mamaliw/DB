const RoomReservation = require('../Model/RoomReservation')
const db = require('../DB')

async function findById(Reservation_Id) {
    return (await sql.query(`select * from Room_Reservations where Reservation_Id = ${Reservation_Id}`)).recordsets[0][0]
}

async function findByIds(Reservation_Ids) {
    return (await sql.query(`select * from Room_Reservations where Reservation_Id in (${Reservation_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from Room_Reservations`)).recordsets[0]
}

async function deleteById(Reservation_Id) {
    return (await sql.query(`delete from Room_Reservations where Reservation_Id = ${Reservation_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(Reservation_Ids) {
    return (await sql.query(`delete from Room_Reservations where Reservation_Id in (${Reservation_Ids})`)).rowsAffected[0] >= Reservation_Ids.length
}

async function save(RoomReservation) {
    if (!RoomReservation){
        throw new Error('Bad RoomReservation')
    }
    let result = (await sql.query(`select * from Room_Reservations where Reservation_Id = ${RoomReservation.Reservation_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[Room_Reservations]
   SET [Room_Id] = ${RoomReservation.Room_Id}
      ,[User_Id] = ${RoomReservation.User_Id}
      ,[Passenger_First_Name] = ${RoomReservation.Passenger_First_Name}
      ,[Passenger_Last_Name] = ${RoomReservation.Passenger_Last_Name}
      ,[Passenger_Gender] = ${RoomReservation.Passenger_Gender}
      ,[Passenger_SSN] = ${RoomReservation.Passenger_SSN}
      ,[Passenger_Phone] = ${RoomReservation.Passenger_Phone}
      ,[Passenger_Age_Class] = ${RoomReservation.Passenger_Age_Class}
      ,[CheckIn_Date_Time] = '${RoomReservation.CheckIn_Date_Time}'
      ,[CheckOut_Date_Time] = '${RoomReservation.CheckOut_Date_Time}'
      ,[Late_CheckIn_Time] = '${RoomReservation.Late_CheckIn_Time}'
 WHERE  Reservation_Id = ${RoomReservation.Reservation_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[Room_Reservations]
           ([Room_Id]
           ,[User_Id]
           ,[Passenger_First_Name]
           ,[Passenger_Last_Name]
           ,[Passenger_Gender]
           ,[Passenger_SSN]
           ,[Passenger_Phone]
           ,[Passenger_Age_Class]
           ,[CheckIn_Date_Time]
           ,[CheckOut_Date_Time]
           ,[Late_CheckIn_Time])
           OUTPUT Inserted.Reservation_Id
     VALUES
           (
            ${RoomReservation.Room_Id},
            ${RoomReservation.User_Id},
            ${RoomReservation.Passenger_First_Name},
            ${RoomReservation.Passenger_Last_Name},
            ${RoomReservation.Passenger_Gender},
            ${RoomReservation.Passenger_SSN},
            ${RoomReservation.Passenger_Phone},
            ${RoomReservation.Passenger_Age_Class},
            '${RoomReservation.CheckIn_Date_Time}',
            '${RoomReservation.CheckOut_Date_Time}',
            '${RoomReservation.Late_CheckIn_Time}'
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