class FlightsReservations {
    constructor(Reservation_Id,Flight_Number,User_Id,Gender,Passenger_Age_Class,Passenger_First_Name,Passenger_Last_Name,Passenger_SSN,Passenger_Birthdate,Passenger_Birth_Country,Passport_Number,Passport_Issue_Country,Passport_Expire_Date) {
        this.Reservation_Id = Reservation_Id
        this.Flight_Number = Flight_Number
        this.User_Id = User_Id
        this.Gender = Gender
        this.Passenger_Age_Class = Passenger_Age_Class
        this.Passenger_First_Name = Passenger_First_Name
        this.Passenger_Last_Name = Passenger_Last_Name
        this.Passenger_SSN = Passenger_SSN
        this.Passenger_Birthdate = Passenger_Birthdate
        this.Passenger_Birth_Country = Passenger_Birth_Country
        this.Passport_Number = Passport_Number
        this.Passport_Issue_Country = Passport_Issue_Country
        this.Passport_Expire_Date = Passport_Expire_Date
    }
}
module.exports = FlightsReservations
