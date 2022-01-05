const RoomOption = require('../Model/RoomOption')
const db = require('../DB')

async function findById(RoomOption_Id) {
    return (await sql.query(`select * from RoomOptions where RoomOption_Id = ${RoomOption_Id}`)).recordsets[0][0]
}

async function findByIds(RoomOption_Ids) {
    return (await sql.query(`select * from RoomOptions where RoomOption_Id in (${RoomOption_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from RoomOptions`)).recordsets[0]
}

async function deleteById(RoomOption_Id) {
    return (await sql.query(`delete from RoomOptions where RoomOption_Id = ${RoomOption_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(RoomOption_Ids) {
    return (await sql.query(`delete from RoomOptions where RoomOption_Id in (${RoomOption_Ids})`)).rowsAffected[0] >= RoomOption_Ids.length
}

async function save(RoomOption) {
    if (!RoomOption){
        throw new Error('Bad RoomOption')
    }
    let result = (await sql.query(`select * from RoomOptions where RoomOption_Id = ${RoomOption.RoomOption_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[RoomOptions]
   SET [Room_Id] = ${RoomOption.Room_Id}
      ,[Has_Vault] = ${RoomOption.Has_Vault}
      ,[Has_Wifi] = ${RoomOption.Has_Wifi}
      ,[Breakfast_Included] = ${RoomOption.Breakfast_Included}
 WHERE  RoomOption_Id = ${RoomOption.RoomOption_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[RoomOptions]
           ([Room_Id]
           ,[Has_Vault]
           ,[Has_Wifi]
           ,[Breakfast_Included])
           OUTPUT Inserted.RoomOption_Id
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