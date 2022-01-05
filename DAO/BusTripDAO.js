const BusTrip = require('../Model/BusTrip')
const db = require('../DB')

async function findById(BusTrip_Id) {
    return (await sql.query(`select * from BusTrips where BusTrip_Id = ${BusTrip_Id}`)).recordsets[0][0]
}

async function findByIds(BusTrip_Ids) {
    return (await sql.query(`select * from BusTrips where BusTrip_Id in (${BusTrip_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from BusTrips`)).recordsets[0]
}

async function deleteById(BusTrip_Id) {
    return (await sql.query(`delete from BusTrips where BusTrip_Id = ${BusTrip_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(BusTrip_Ids) {
    return (await sql.query(`delete from BusTrips where BusTrip_Id in (${BusTrip_Ids})`)).rowsAffected[0] >= BusTrip_Ids.length
}

async function save(BusTrip) {
    if (!BusTrip){
        throw new Error('Bad BusTrip')
    }
    let result = (await sql.query(`select * from BusTrips where BusTrip_Id = ${BusTrip.BusTrip_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[BusTrips]
   SET [Trip_Number] = ${BusTrip.Trip_Number}
      ,[Origin_City] = ${BusTrip.Origin_City}
      ,[Origin_Terminal] = ${BusTrip.Origin_Terminal}
      ,[Destination_City] = ${BusTrip.Destination_City}
      ,[Destination_Terminal] = ${BusTrip.Destination_Terminal}
      ,[Departure_Date_Time] = '${BusTrip.Departure_Date_Time}'
      ,[Company] = ${BusTrip.Company}
      ,[Price] = ${BusTrip.Price}
      ,[Bus_Type] = ${BusTrip.Bus_Type}
      ,[Capacity] = ${BusTrip.Capacity}
 WHERE  BusTrip_Id = ${BusTrip.BusTrip_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[BusTrips]
           ([Trip_Number]
           ,[Origin_City]
           ,[Origin_Terminal]
           ,[Destination_City]
           ,[Destination_Terminal]
           ,[Departure_Date_Time]
           ,[Company]
           ,[Price]
           ,[Bus_Type]
           ,[Capacity])
           OUTPUT Inserted.BusTrip_Id
     VALUES
           (
            ${BusTrip.Trip_Number},
            ${BusTrip.Origin_City},
            ${BusTrip.Origin_Terminal},
            ${BusTrip.Destination_City},
            ${BusTrip.Destination_Terminal},
            '${BusTrip.Departure_Date_Time}',
            ${BusTrip.Company},
            ${BusTrip.Price},
            ${BusTrip.Bus_Type},
            ${BusTrip.Capacity}
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