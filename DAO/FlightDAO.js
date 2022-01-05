const Flight = require('../Model/Flight')
const db = require('../DB')

async function findById(Flight_Id) {
    return (await sql.query(`select * from Flights where Flight_Id = ${Flight_Id}`)).recordsets[0][0]
}

async function findByIds(Flight_Ids) {
    return (await sql.query(`select * from Flights where Flight_Id in (${Flight_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from Flights`)).recordsets[0]
}

async function deleteById(Flight_Id) {
    return (await sql.query(`delete from Flights where Flight_Id = ${Flight_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(Flight_Ids) {
    return (await sql.query(`delete from Flights where Flight_Id in (${Flight_Ids})`)).rowsAffected[0] >= Flight_Ids.length
}

async function save(Flight) {
    if (!Flight){
        throw new Error('Bad Flight')
    }
    let result = (await sql.query(`select * from Flights where Flight_Id = ${Flight.Flight_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[Flights]
   SET [Flight_Number] = ${Flight.Flight_Number}
      ,[Departure_Date_Time] = '${Flight.Departure_Date_Time}'
      ,[Capacity] = ${Flight.Capacity}
      ,[Class] = ${Flight.Class}
      ,[Type] = ${Flight.Type}
      ,[Origin_City] = ${Flight.Origin_City}
      ,[Arrival_Date_Time] = '${Flight.Arrival_Date_Time}'
      ,[Destination_City] = ${Flight.Destination_City}
      ,[Price] = ${Flight.Price}
 WHERE  Flight_Id = ${Flight.Flight_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[Flights]
           ([Flight_Number]
           ,[Departure_Date_Time]
           ,[Capacity]
           ,[Class]
           ,[Type])
           OUTPUT Inserted.Flight_Id
     VALUES
           (
            ${Flight.Flight_Number},
            '${Flight.Departure_Date_Time}',
            ${Flight.Capacity},
            ${Flight.Class},
            ${Flight.Type},
            ${Flight.Origin_City},
            '${Flight.Arrival_Date_Time}',
            ${Flight.Destination_City},
            ${Flight.Price}
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