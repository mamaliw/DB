const Hotel = require('../Model/Hotel')
const db = require('../DB')

async function findById(Hotel_Id) {
    return (await sql.query(`select * from Hotels where Hotel_Id = ${Hotel_Id}`)).recordsets[0][0]
}

async function findByIds(Hotel_Ids) {
    return (await sql.query(`select * from Hotels where Hotel_Id in (${Hotel_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from Hotels`)).recordsets[0]
}

async function deleteById(Hotel_Id) {
    return (await sql.query(`delete from Hotels where Hotel_Id = ${Hotel_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(Hotel_Ids) {
    return (await sql.query(`delete from Hotels where Hotel_Id in (${Hotel_Ids})`)).rowsAffected[0] >= Hotel_Ids.length
}

async function save(Hotel) {
    if (!Hotel){
        throw new Error('Bad Hotel')
    }
    let result = (await sql.query(`select * from Hotels where Hotel_Id = ${Hotel.Hotel_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[Hotels]
   SET [Hotel_Id] = ${Hotel.Hotel_Id}
      ,[Name] = ${Hotel.Name}
      ,[City] = ${Hotel.City}
      ,[Stars] = ${Hotel.Stars}
      ,[Score] = ${Hotel.Score}
      ,[Residence_Type] = ${Hotel.Residence_Type}
 WHERE  Hotel_Id = ${Hotel.Hotel_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[Hotels]
           ([Hotel_Id]
           ,[Name]
           ,[City]
           ,[Stars]
           ,[Score]
           ,[Residence_Type])
           OUTPUT Inserted.Hotel_Id
     VALUES
           (
            ${Hotel.Hotel_Id},
            ${Hotel.Name},
            ${Hotel.City},
            ${Hotel.Stars},
            ${Hotel.Score},
            ${Hotel.Residence_Type}
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