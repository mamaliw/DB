const BusStop = require('../Model/BusStop')
const db = require('../DB')

async function findById(BusStop_Id) {
    return (await sql.query(`select * from BusStops where BusStop_Id = ${BusStop_Id}`)).recordsets[0][0]
}

async function findByIds(BusStop_Ids) {
    return (await sql.query(`select * from BusStops where BusStop_Id in (${BusStop_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from BusStops`)).recordsets[0]
}

async function deleteById(BusStop_Id) {
    return (await sql.query(`delete from BusStops where BusStop_Id = ${BusStop_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(BusStop_Ids) {
    return (await sql.query(`delete from BusStops where BusStop_Id in (${BusStop_Ids})`)).rowsAffected[0] >= BusStop_Ids.length
}

async function save(BusStop) {
    if (!BusStop){
        throw new Error('Bad BusStop')
    }
    let result = (await sql.query(`select * from BusStops where BusStop_Id = ${BusStop.BusStop_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[BusStops]
   SET [Trip_Number] = ${BusStop.Trip_Number}
      ,[Stop_City] = ${BusStop.Stop_City}
 WHERE  BusStop_Id = ${BusStop.BusStop_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[BusStops]
           ([Trip_Number]
           ,[Stop_City])
           OUTPUT Inserted.BusStop_Id
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