const sql = require('mssql')
require('dotenv').config()
const User = require('./Model/User')
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: '185.220.224.56',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

async function main () {
    try {
        await sql.connect(sqlConfig)
        const result = (await sql.query(`select top 3 * from Users`)).recordsets[0]
        // console.log(result[0])
        const keys = Object.keys(result[0])
        const user = new User(result[0][keys[0]], result[0][keys[1]], result[0][keys[2]], result[0][keys[3]], result[0][keys[4]], result[0][keys[5]], result[0][keys[6]], result[0][keys[7]], result[0][keys[8]], result[0][keys[9]], result[0][keys[10]], result[0][keys[11]], result[0][keys[12]], result[0][keys[13]] )
        console.log(user)
        // console.log(keys)
    } catch (err) {
        console.log(err)
    }
}

main()