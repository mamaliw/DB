const Transaction = require('../Model/Transaction')
const db = require('../DB')

async function findById(Transaction_Id) {
    return (await sql.query(`select * from Transactions where Transaction_Id = ${Transaction_Id}`)).recordsets[0][0]
}

async function findByIds(Transaction_Ids) {
    return (await sql.query(`select * from Transactions where Transaction_Id in (${Transaction_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from Transactions`)).recordsets[0]
}

async function deleteById(Transaction_Id) {
    return (await sql.query(`delete from Transactions where Transaction_Id = {Transaction_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(Transaction_Ids) {
    return (await sql.query(`delete from Transactions where Transaction_Id in (${Transaction_Ids})`)).rowsAffected[0] >= Transaction_Ids.length
}

async function save(Transaction) {
    if (!Transaction){
        throw new Error('Bad Transaction')
    }
    let result = (await sql.query(`select * from Transactions where Transaction_Id = ${Transaction.Transaction_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[Transactions]
   SET [User_Id] = ${Transaction.User_Id}
      ,[Type] = ${Transaction.Type}
      ,[Amount] = ${Transaction.Amount}
      ,[Date] = '${Transaction.Date}'
 WHERE  Transaction_Id = ${Transaction.Transaction_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[Transactions]
           ([User_Id]
           ,[Type]
           ,[Amount]
           ,[Date])
           OUTPUT Inserted.Transaction_Id
     VALUES
           (
            ${Transaction.User_Id},
            ${Transaction.Type},
            ${Transaction.Amount},
            '${Transaction.Date}'
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