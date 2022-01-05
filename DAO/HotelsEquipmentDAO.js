const HotelsEquipment = require('../Model/HotelsEquipment')
const db = require('../DB')

async function findById(Hotels_Equipment_Id) {
    return (await sql.query(`select * from Hotels_Equipments where Hotels_Equipment_Id = ${Hotels_Equipment_Id}`)).recordsets[0][0]
}

async function findByIds(Hotels_Equipment_Ids) {
    return (await sql.query(`select * from Hotels_Equipments where Hotels_Equipment_Id in (${Hotels_Equipment_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from Hotels_Equipments`)).recordsets[0]
}

async function deleteById(Hotels_Equipment_Id) {
    return (await sql.query(`delete from Hotels_Equipments where Hotels_Equipment_Id = ${Hotels_Equipment_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(Hotels_Equipment_Ids) {
    return (await sql.query(`delete from Hotels_Equipments where Hotels_Equipment_Id in (${Hotels_Equipment_Ids})`)).rowsAffected[0] >= Hotels_Equipment_Ids.length
}

async function save(HotelsEquipment) {
    if (!HotelsEquipment){
        throw new Error('Bad HotelsEquipment')
    }
    let result = (await sql.query(`select * from Hotels_Equipments where Hotels_Equipment_Id = ${HotelsEquipment.Hotels_Equipment_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[Hotels_Equipments]
   SET [Hotel_Id] = ${HotelsEquipment.Hotel_Id}
      ,[Has_Pool] = ${HotelsEquipment.Has_Pool}
      ,[Has_Spa] = ${HotelsEquipment.Has_Spa}
      ,[Has_Parking] = ${HotelsEquipment.Has_Parking}
      ,[Has_Taxi] = ${HotelsEquipment.Has_Taxi}
      ,[Has_Bar] = ${HotelsEquipment.Has_Bar}
 WHERE  Hotels_Equipment_Id = ${HotelsEquipment.Hotels_Equipment_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[Hotels_Equipments]
           ([Hotel_Id]
           ,[Has_Pool]
           ,[Has_Spa]
           ,[Has_Parking]
           ,[Has_Taxi]
           ,[Has_Bar])
           OUTPUT Inserted.Hotels_Equipment_Id
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