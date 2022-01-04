class BusReservation {
    constructor(Reservation_Id,Trip_Number,User_Id,Is_Head_Passenger,Passenger_Phone,Passenger_First_Name,Passenger_Last_Name,Passenger_SSN,Seat_Number) {
        this.Reservation_Id = Reservation_Id
        this.Trip_Number = Trip_Number
        this.User_Id = User_Id
        this.Is_Head_Passenger = Is_Head_Passenger
        this.Passenger_Phone = Passenger_Phone
        this.Passenger_First_Name = Passenger_First_Name
        this.Passenger_Last_Name = Passenger_Last_Name
        this.Passenger_SSN = Passenger_SSN
        this.Seat_Number = Seat_Number
    }
}
module.exports = BusReservation
