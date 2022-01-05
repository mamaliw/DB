require('dotenv').config();
const db = require('./DB');
const DAO = require('./DAO');

(async function () {
    global.sql = await db.connect()
    // console.log(await DAO.BusReservationDAO.findAll())
    // console.log(await DAO.BusStopDAO.findAll())
    // console.log(await DAO.BusTripDAO.findAll())
    // console.log(await DAO.FlightDAO.findAll())
    // console.log(await DAO.FlightsDomesticDAO.findAll())
    // console.log(await DAO.FlightsForeignDAO.findAll())
    // console.log(await DAO.FlightsForeignStopDAO.findAll())
    // console.log(await DAO.FlightsReservationDAO.findAll())
    // console.log(await DAO.HotelDAO.findAll())
    // console.log(await DAO.HotelsEquipmentDAO.findAll())
    // console.log(await DAO.RoomDAO.findAll())
    // console.log(await DAO.RoomOptionDAO.findAll())
    // console.log(await DAO.RoomReservationDAO.findAll())
    // console.log(await DAO.TransactionDAO.findAll())
    console.log(await DAO.UserDAO.findAll())
}())