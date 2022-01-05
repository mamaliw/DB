const User = require('../Model/User')
const db = require('../DB')

async function findById(User_Id) {
    return (await sql.query(`select * from Users where User_Id = ${User_Id}`)).recordsets[0][0]
}

async function findByIds(User_Ids) {
    return (await sql.query(`select * from Users where User_Id in (${User_Ids})`)).recordsets[0]
}

async function findAll() {
    return (await sql.query(`select * from Users`)).recordsets[0]
}

async function deleteById(User_Id) {
    return (await sql.query(`delete from Users where User_Id = ${User_Id}`)).rowsAffected[0] > 0
}

async function deleteByIds(User_Ids) {
    return (await sql.query(`delete from Users where User_Id in (${User_Ids})`)).rowsAffected[0] >= User_Ids.length
}

async function save(User) {
    if (!User){
        throw new Error('Bad User')
    }
    let result = (await sql.query(`select * from Users where User_Id = ${User.User_Id}`)).recordsets[0].length > 0
    if (result) {
        return (await sql.query(`UPDATE [dbo].[Users]
   SET [First_Name] = ${User.First_Name}
      ,[Last_Name] = ${User.Last_Name}
      ,[SSN] = ${User.SSN}
      ,[Email] = ${User.Email}
      ,[Balance] = ${User.Balance}
      ,[Phone_Home] = ${User.Phone_Home}
      ,[Phone_Mobile] = ${User.Phone_Mobile}
      ,[Gender] = ${User.Gender}
      ,[Birthdate] = '${User.Birthdate}'
      ,[Bank_Account_Number] = ${User.Bank_Account_Number}
      ,[Bank_Account_IRR] = ${User.Bank_Account_IRR}
      ,[Credit_Card_Number] = ${User.Credit_Card_Number}
      ,[Registration_Date] = '${User.Registration_Date}'
 WHERE  User_Id = ${User.User_Id}`))
    }
    return (await sql.query(`
INSERT INTO [dbo].[Users]
           ([First_Name]
           ,[Last_Name]
           ,[SSN]
           ,[Email]
           ,[Balance]
           ,[Phone_Home]
           ,[Phone_Mobile]
           ,[Gender]
           ,[Birthdate]
           ,[Bank_Account_Number]
           ,[Bank_Account_IRR]
           ,[Credit_Card_Number])
           OUTPUT Inserted.User_Id
     VALUES
           (
            ${User.First_Name},
            ${User.Last_Name},
            ${User.SSN},
            ${User.Email},
            ${User.Balance},
            ${User.Phone_Home},
            ${User.Phone_Mobile},
            ${User.Gender},
            '${User.Birthdate}',
            ${User.Bank_Account_Number},
            ${User.Bank_Account_IRR},
            ${User.Credit_Card_Number}
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