const User = require('../Model/User')
const db = require('../DB')
async function findById(UserId) {
    return (await sql.query(`select * from Users where User_Id = ${UserId}`)).recordsets[0][0]
}
async function findByIds(UserIds) {
    return (await sql.query(`select * from Users where User_Id in (${UserIds})`)).recordsets[0]
}
async function findAll() {
    return (await sql.query(`select * from Users`)).recordsets[0]
}
async function deleteById(UserId) {

}
async function deleteByIds(UserIds) {

}
async function save(User) {

}

module.exports = {
    findById,
    findByIds,
    findAll,
    deleteById,
    deleteByIds,
    save
}