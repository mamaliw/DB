class BusTrip {
    constructor(Trip_Number,Origin_City,Origin_Terminal,Destination_City,Destination_Terminal,Departure_Date_Time,Company,Price,Bus_Type,Capacity) {
        this.Trip_Number = Trip_Number
        this.Origin_City = Origin_City
        this.Origin_Terminal = Origin_Terminal
        this.Destination_City = Destination_City
        this.Destination_Terminal = Destination_Terminal
        this.Departure_Date_Time = Departure_Date_Time
        this.Company = Company
        this.Price = Price
        this.Bus_Type = Bus_Type
        this.Capacity = Capacity
    }
}
module.exports = BusTrip
