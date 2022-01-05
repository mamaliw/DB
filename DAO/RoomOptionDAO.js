const RoomOption = require('../Model/RoomOption')
const db = require('../DB')

async function findById(Room_Option_Id) {
    return (await sql.query(`select * from Room_Options where Room_Option_Id = ${Room_Option_Id}`)).recordsets[0][0]
}

async function findByIds(Room_Option_Ids) {
    return (await sql.query(`select * from Room_Options where Room_Option_Id in (${Room_Option_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from Room_Options`)).recordsets[0]
}

async function deleteById(Room_Option_Id) {
    return (await sql.query(`delete from Room_Options where Room_Option_Id = ${Room_Option_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(Room_Option_Ids) {
    return (await sql.query(`delete from Room_Options where Room_Option_Id in (${Room_Option_Ids})`)).rowsAffected[0] >= Room_Option_Ids.length
}

async function save(RoomOption) {
    if (!RoomOption){
        throw new Error('Bad RoomOption')
    }
    let result = (await sql.query(`select * from Room_Options where Room_Option_Id = ${RoomOption.Room_Option_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[Room_Options]
   SET [Room_Id] = ${RoomOption.Room_Id}
      ,[Has_Vault] = ${RoomOption.Has_Vault}
      ,[Has_Wifi] = ${RoomOption.Has_Wifi}
      ,[Breakfast_Included] = ${RoomOption.Breakfast_Included}
 WHERE  Room_Option_Id = ${RoomOption.Room_Option_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[Room_Options]
           ([Room_Id]
           ,[Has_Vault]
           ,[Has_Wifi]
           ,[Breakfast_Included])
           OUTPUT Inserted.Room_Option_Id
     VALUES
           (
            ${RoomOption.Room_Id},
            ${RoomOption.Has_Vault},
            ${RoomOption.Has_Wifi},
            ${RoomOption.Breakfast_Included}
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