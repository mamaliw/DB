class User {
    constructor(User_Id, First_Name, Last_Name, SSN, Email, Balance, Phone_Home, Phone_Mobile, Gender, Birthdate, Bank_Account_Number, Bank_Account_IRR, Credit_Card_Number, Registration_Date) {
        this.User_Id = User_Id
        this.First_Name = First_Name
        this.Last_Name = Last_Name
        this.SSN = SSN
        this.Email = Email
        this.Balance = Balance
        this.Phone_Home = Phone_Home
        this.Phone_Mobile = Phone_Mobile
        this.Gender = Gender
        this.Birthdate = Birthdate
        this.Bank_Account_Number = Bank_Account_Number
        this.Bank_Account_IRR = Bank_Account_IRR
        this.Credit_Card_Number = Credit_Card_Number
        this.Registration_Date = Registration_Date
    }

}
module.exports = User
