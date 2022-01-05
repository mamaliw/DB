const Room = require('../Model/Room')
const db = require('../DB')

async function findById(Room_Id) {
    return (await sql.query(`select * from Rooms where Room_Id = ${Room_Id}`)).recordsets[0][0]
}

async function findByIds(Room_Ids) {
    return (await sql.query(`select * from Rooms where Room_Id in (${Room_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from Rooms`)).recordsets[0]
}

async function deleteById(Room_Id) {
    return (await sql.query(`delete from Rooms where Room_Id = ${Room_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(Room_Ids) {
    return (await sql.query(`delete from Rooms where Room_Id in (${Room_Ids})`)).rowsAffected[0] >= Room_Ids.length
}

async function save(Room) {
    if (!Room){
        throw new Error('Bad Room')
    }
    let result = (await sql.query(`select * from Rooms where Room_Id = ${Room.Room_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[Rooms]
   SET [Room_Id] = ${Room.Room_Id}
      ,[Name] = ${Room.Name}
      ,[Price] = ${Room.Price}
      ,[Capacity] = ${Room.Capacity}
      ,[Hotel_Id] = ${Room.Hotel_Id}
 WHERE  Room_Id = ${Room.Room_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[Rooms]
           ([Room_Id]
           ,[Name]
           ,[Price]
           ,[Capacity]
           ,[Hotel_Id])
           OUTPUT Inserted.Room_Id
     VALUES
           (
            ${Room.Room_Id},
            ${Room.Name},
            ${Room.Price},
            ${Room.Capacity},
            ${Room.Hotel_Id}
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