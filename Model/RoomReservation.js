class RoomReservation {
    constructor(Reservation_Id,Room_Id,User_Id,Passenger_First_Name,Passenger_Last_Name,Passenger_Gender,Passenger_SSN,Passenger_Phone,Passenger_Age_Class,CheckIn_Date_Time,CheckOut_Date_Time,Late_CheckIn_Time) {
        this.Reservation_Id = Reservation_Id
        this.Room_Id = Room_Id
        this.User_Id = User_Id
        this.Passenger_First_Name = Passenger_First_Name
        this.Passenger_Last_Name = Passenger_Last_Name
        this.Passenger_Gender = Passenger_Gender
        this.Passenger_SSN = Passenger_SSN
        this.Passenger_Phone = Passenger_Phone
        this.Passenger_Age_Class = Passenger_Age_Class
        this.CheckIn_Date_Time = CheckIn_Date_Time
        this.CheckOut_Date_Time = CheckOut_Date_Time
        this.Late_CheckIn_Time = Late_CheckIn_Time
    }

}
module.exports = RoomReservation
