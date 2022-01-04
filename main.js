require('dotenv').config();
const db = require('./DB');
const userDao = require('./DAO/UserDAO');

// async function main () {
//     try {
//         await sql.connect(sqlConfig)
//         const result = (await sql.query(`select top 1 * from Bus_Reservations`)).recordsets[0]
//         // console.log(result[0])
//         const keys = Object.keys(result[0])
//         // const user = new User(result[0][keys[0]], result[0][keys[1]], result[0][keys[2]], result[0][keys[3]], result[0][keys[4]], result[0][keys[5]], result[0][keys[6]], result[0][keys[7]], result[0][keys[8]], result[0][keys[9]], result[0][keys[10]], result[0][keys[11]], result[0][keys[12]], result[0][keys[13]] )
//         // console.log(user)
//         // console.log(keys)
//         let st = ''
//         keys.map((el) => {
//             st += el+','
//         })
//         console.log(st)
//     } catch (err) {
//         console.log(err)
//     }
// }
// main()




(async function () {
    global.sql = await db.connect()
    const result = await userDao.findAll()
    console.log(result)
}())