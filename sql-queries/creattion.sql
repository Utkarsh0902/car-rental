DROP TABLE IF EXISTS Customer;
CREATE TABLE Customer
(DLNo varchar(100) NOT NULL PRIMARY KEY,
EmailId varchar(100) NOT NULL,
Password varchar(100) NOT NULL,
Zipcode bigint NOT NULL,
Street varchar(500) ,
City varchar(500) NOT NULL,
State varchar(500) NOT NULL,
FName varchar(100) NOT NULL,
LName varchar(100) NOT NULL,
PhoneNumber bigint NOT NULL);




DROP TABLE IF EXISTS Discount;
CREATE TABLE Discount
(DiscountCode varchar(100) NOT NULL PRIMARY KEY,
DiscountPercent real NOT NULL,
Name varchar(100) NOT NULL,
ExpiryDate timestamp );


DROP TABLE IF EXISTS Car_Category;
CREATE TABLE Car_Category
(Name varchar(100) NOT NULL PRIMARY KEY,
NoOfPerson int NOT NULL,
LuggageWeight real NOT NULL,
CostPerDay real NOT NULL);



DROP TABLE IF EXISTS Location;
CREATE TABLE Location
(LocId varchar(100) NOT NULL PRIMARY KEY,
Name varchar(100) NOT NULL,
Street varchar(500) NOT NULL,
State varchar(500) NOT NULL,
ZipCode bigint NOT NULL,
City varchar(500) NOT NULL);



DROP TABLE IF EXISTS Car;
CREATE TABLE Car
(RNo varchar(100) NOT NULL PRIMARY KEY,
AvailabilityFlag boolean NOT NULL,
Model varchar(100) NOT NULL,
Mileage real NOT NULL,
FuelType varchar(100) NOT NULL,
Name varchar(100) NOT NULL,
LocId varchar(100) NOT NULL,
Foreign Key(Name) References Car_Category(Name),
Foreign Key(LocId) References Location(LocId)
) ;



DROP TABLE IF EXISTS Billing;
CREATE TABLE Billing
(BillId varchar(100) NOT NULL PRIMARY KEY,
BillDate date NOT NULL,
DiscountCode varchar(100) NOT NULL,
BookingID varchar(100) NOT NULL,
Foreign Key(DiscountCode) References Discount(DiscountCode));



DROP TABLE IF EXISTS Booking;
CREATE TABLE Booking
(BookingId varchar(100) NOT NULL PRIMARY KEY,
FromDateTime timestamp NOT NULL,
BookingStatus boolean NOT NULL,
ReturnDateTime timestamp NOT NULL,
ActualReturnDateTime timestamp NOT NULL,
DLNo varchar(100) NOT NULL,
RNo varchar(100) NOT NULL,
BillId varchar(100) NOT NULL,
DropOff_LocId varchar(100) NOT NULL,
PickUp_LocId varchar(100) NOT NULL,
Foreign Key (DLNo) References Customer(DLNo),
Foreign Key (RNo) References Car(RNo),
Foreign Key (BillId) References Billing(BillId),
Foreign Key (DropOff_Locid) References Location(LocId),
Foreign Key (PickUp_Locid) References Location(LocId));

ALTER TABLE Billing ADD CONSTRAINT fk_BookingId FOREIGN KEY (BookingId) REFERENCES Booking(BookingId);