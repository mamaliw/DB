const BusStop = require('../Model/BusStop')
const db = require('../DB')

async function findById(Bus_Stop_Id) {
    return (await sql.query(`select * from Bus_Stops where Bus_Stop_Id = ${Bus_Stop_Id}`)).recordsets[0][0]
}

async function findByIds(Bus_Stop_Ids) {
    return (await sql.query(`select * from Bus_Stops where Bus_Stop_Id in (${Bus_Stop_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from Bus_Stops`)).recordsets[0]
}

async function deleteById(Bus_Stop_Id) {
    return (await sql.query(`delete from Bus_Stops where Bus_Stop_Id = ${Bus_Stop_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(Bus_Stop_Ids) {
    return (await sql.query(`delete from Bus_Stops where Bus_Stop_Id in (${Bus_Stop_Ids})`)).rowsAffected[0] >= Bus_Stop_Ids.length
}

async function save(BusStop) {
    if (!BusStop){
        throw new Error('Bad BusStop')
    }
    let result = (await sql.query(`select * from Bus_Stops where Bus_Stop_Id = ${BusStop.Bus_Stop_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[Bus_Stops]
   SET [Trip_Number] = ${BusStop.Trip_Number}
      ,[Stop_City] = ${BusStop.Stop_City}
 WHERE  Bus_Stop_Id = ${BusStop.Bus_Stop_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[Bus_Stops]
           ([Trip_Number]
           ,[Stop_City])
           OUTPUT Inserted.Bus_Stop_Id
     VALUES
           (
            ${BusStop.Trip_Number},
            ${BusStop.Stop_City}
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