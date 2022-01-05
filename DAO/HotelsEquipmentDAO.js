const HotelsEquipment = require('../Model/HotelsEquipment')
const db = require('../DB')

async function findById(HotelsEquipment_Id) {
    return (await sql.query(`select * from HotelsEquipments where HotelsEquipment_Id = ${HotelsEquipment_Id}`)).recordsets[0][0]
}

async function findByIds(HotelsEquipment_Ids) {
    return (await sql.query(`select * from HotelsEquipments where HotelsEquipment_Id in (${HotelsEquipment_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from HotelsEquipments`)).recordsets[0]
}

async function deleteById(HotelsEquipment_Id) {
    return (await sql.query(`delete from HotelsEquipments where HotelsEquipment_Id = ${HotelsEquipment_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(HotelsEquipment_Ids) {
    return (await sql.query(`delete from HotelsEquipments where HotelsEquipment_Id in (${HotelsEquipment_Ids})`)).rowsAffected[0] >= HotelsEquipment_Ids.length
}

async function save(HotelsEquipment) {
    if (!HotelsEquipment){
        throw new Error('Bad HotelsEquipment')
    }
    let result = (await sql.query(`select * from HotelsEquipments where HotelsEquipment_Id = ${HotelsEquipment.HotelsEquipment_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[HotelsEquipments]
   SET [Hotel_Id] = ${HotelsEquipment.Hotel_Id}
      ,[Has_Pool] = ${HotelsEquipment.Has_Pool}
      ,[Has_Spa] = ${HotelsEquipment.Has_Spa}
      ,[Has_Parking] = ${HotelsEquipment.Has_Parking}
      ,[Has_Taxi] = ${HotelsEquipment.Has_Taxi}
      ,[Has_Bar] = ${HotelsEquipment.Has_Bar}
 WHERE  HotelsEquipment_Id = ${HotelsEquipment.HotelsEquipment_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[HotelsEquipments]
           ([Hotel_Id]
           ,[Has_Pool]
           ,[Has_Spa]
           ,[Has_Parking]
           ,[Has_Taxi]
           ,[Has_Bar])
           OUTPUT Inserted.HotelsEquipment_Id
     VALUES
           (
            ${HotelsEquipment.Hotel_Id},
            ${HotelsEquipment.Has_Pool},
            ${HotelsEquipment.Has_Spa},
            ${HotelsEquipment.Has_Parking},
            ${HotelsEquipment.Has_Taxi},
            ${HotelsEquipment.Has_Bar}
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