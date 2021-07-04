const express = require('express');
const app = express();
const pool = require('./db.js');

app.use(express.json()); // used for req.body 

//ROUTES//

//CUSTOMER//
//create a customer
app.post("/customer", async(req, res)=>{
    try{
        const {dlno} = req.body; // destructuring the request
        const {emailid} = req.body;
        const {password} = req.body;
        const {zipcode} = req.body;
        const {street} = req.body;
        const {city} = req.body;
        const {state} = req.body;
        const {fname} = req.body;
        const {lname} = req.body;
        const {phonenumber} = req.body;

        const newCustomer = await pool.query
        ("INSERT INTO customer (dlno, emailid, password, zipcode, street, city,state, fname, lname, phonenumber) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) Returning *",
        [dlno, emailid, password, zipcode, street, city, state, fname, lname, phonenumber]);

        //send back the newTodo data as a convention
        res.json(newCustomer.rows);
    }catch(err){
        console.error(err.message);
    }
});

// get all customers
app.get("/customer", async(req, res)=>{
    try{
        console.log("Get all customers request made");
        const allCustomers = await pool.query("select * from customer");

        res.json(allCustomers.rows);
    }catch(err){
        console.error(err.message);

    }
});

//get a specific customer
app.get("/customer/:dlno", async(req, res)=>{
    try{
        const {dlno} = req.params;
        console.log("Get single customer request made");
        console.log(req.params);
        const singleCustomer = await pool.query("select * from customer where dlno = ($1)", [dlno]);

        res.json(singleCustomer.rows);
    }catch(err){
        console.error(err.message);

    }
});

app.get("/customer/email/:email/:password", async(req, res)=>{
    try{
        const {email, password} = req.params;
        console.log("Get single customer email request made");
        const singleCustomer = await pool.query("select * from customer where emailid = ($1) and password = ($2)", [email, password]);

        res.json(singleCustomer.rows);
    }catch(err){
        console.error(err.message);

    } 
});

//update a customer
app.put("/customer/:dlno", async(req, res)=>{
    try{
        const {dlno} = req.params; //where
        const {field} = req.body; //set
        const {newValue} = req.body; //set
        console.log("Making changes to customer");
        const singleCustomer = await pool.query(
            "update customer set "+ field +  " = $1 where dlno = $2 returning *",
             [newValue, dlno]);

        res.json(singleCustomer.rows);
    }catch(err){
        console.error(err.message);

    }
});

//delete a customer
app.delete("/customer/:dlno", async(req, res)=>{
    try{
        const {dlno} = req.params;
        console.log("Deleting a customer with dlno: ",dlno);
        const singleCustomer = await pool.query("delete from customer where dlno = $1 returning * ", [dlno]);

        res.json(singleCustomer.rows);
    }catch(err){
        console.error(err.message);

    }
});

//CAR//
//create a car
app.post("/car", async(req, res)=>{
    try{
        const {rno} = req.body; // destructuring the request
        const {availabilityflag} = req.body;
        const {model} = req.body;
        const {mileage} = req.body;
        const {fueltype} = req.body;
        const {name} = req.body;
        const {locid} = req.body;
        console.log(availabilityflag);
        const newCar = await pool.query
        ("INSERT INTO car (rno, availabilityflag, model, mileage, fueltype, name,locid) VALUES ($1,$2,$3,$4,$5,$6,$7) Returning *",
        [rno, availabilityflag, model, mileage, fueltype, name, locid]);

        //send back the newTodo data as a convention
        res.json(newCar.rows);
    }catch(err){
        console.error(err.message);
    }
});

// get all cars
app.get("/car", async(req, res)=>{
    try{
        console.log("Get all car request made");
        const allCar = await pool.query("select * from car");

        res.json(allCar.rows);
    }catch(err){
        console.error(err.message);

    }
});

//get a specific car
app.get("/car/:rno", async(req, res)=>{
    try{
        const {rno} = req.params;
        console.log("Get single car request made");
        const singleCar = await pool.query("select * from car where rno = ($1)", [rno]);

        res.json(singleCar.rows);
    }catch(err){
        console.error(err.message);

    }
});
app.get("/car/model/:model", async(req, res)=>{
    try{
        const {model} = req.params;
        console.log("Get single car model request made");
        const singleCar = await pool.query("select rno from car where model = ($1)", [model]);

        res.json(singleCar.rows);
    }catch(err){
        console.error(err.message);

    }
});

//update a car
app.put("/car/:rno", async(req, res)=>{
    try{
        const {rno} = req.params; //where
        const {field} = req.body; //set
        const {newValue} = req.body; //set
        console.log("Making changes to car");
        const singleCar = await pool.query(
            "update car set "+ field +  " = $1 where rno = $2 returning *",
             [newValue, rno]);

        res.json(singleCar.rows);
    }catch(err){
        console.error(err.message);

    }
});

//delete a car
app.delete("/car/:rno", async(req, res)=>{
    try{
        const {rno} = req.params;
        console.log("Deleting a car with rno: ",rno);
        const singleCar = await pool.query("delete from car where rno = $1 returning * ", [rno]);

        res.json(singleCar.rows);
    }catch(err){
        console.error(err.message);

    }
});

//LOCATION//
//create a location
app.post("/location", async(req, res)=>{
    try{
        const {locid} = req.body; // destructuring the request
        const {name} = req.body;
        const {street} = req.body;
        const {state} = req.body;
        const {zipcode} = req.body;
        const {city} = req.body;

        const newLocation = await pool.query
        ("INSERT INTO location (locid, name, street, state, zipcode, city) VALUES ($1,$2,$3,$4,$5,$6) Returning *",
        [locid, name, street, state, zipcode, city]);

        //send back the newTodo data as a convention
        res.json(newLocation.rows);
    }catch(err){
        console.error(err.message);
    }
});

// get all locations
app.get("/location", async(req, res)=>{
    try{
        console.log("Get locations request made");
        const allLocations = await pool.query("select * from location");

        res.json(allLocations.rows);
    }catch(err){
        console.error(err.message);

    }
});

//get a specific location
app.get("/location/:locid", async(req, res)=>{
    try{
        const {locid} = req.params;
        console.log("Get single location request made");
        const singleLocation = await pool.query("select * from location where locid = ($1)", [locid]);

        res.json(singleLocation.rows);
    }catch(err){
        console.error(err.message);

    }
});

//update a location
app.put("/location/:locid", async(req, res)=>{
    try{
        const {locid} = req.params; //where
        const {field} = req.body; //set
        const {newValue} = req.body; //set
        console.log("Making changes to location");
        const singleLocation = await pool.query(
            "update Location set "+ field +  " = $1 where locid = $2 returning *",
             [newValue, locid]);

        res.json(singleLocation.rows);
    }catch(err){
        console.error(err.message);

    }
});

//delete a location
app.delete("/location/:locid", async(req, res)=>{
    try{
        const {locid} = req.params;
        console.log("Deleting a location with locid: ",locid);
        const singleLocation = await pool.query("delete from Location where locid = $1 returning * ", [locid]);

        res.json(singleLocation.rows);
    }catch(err){
        console.error(err.message);

    }
});

//CAR CATEGORYYYY//
//create a car category
app.post("/car-category", async(req, res)=>{
    
    try{
        
        const {name} = req.body; // destructuring the request
        const {noofperson} = req.body;
        const {luggageweight} = req.body;
        const {costperday} = req.body;
        const newCarCategory = await pool.query
        ("INSERT INTO car_category (name, noofperson, luggageweight, costperday) VALUES ($1,$2,$3,$4) Returning *",
        [name,noofperson, luggageweight, costperday]);

        //send back the newTodo data as a convention
        res.json(newCarCategory.rows);
    }catch(err){
        console.error(err.message);
    }
});

// get all car categories
app.get("/car-category", async(req, res)=>{
    try{
        console.log("Get all car categories request made");
        const allCarCategory= await pool.query("select * from car_category");

        res.json(allCarCategory.rows);
    }catch(err){
        console.error(err.message);
 
    }
});

//get a specific car-category
app.get("/car-category/:name", async(req, res)=>{
    try{
        const {name} = req.params;
        console.log(req.params)
        console.log("Get single car-category request made");
        const singleCarCategory = await pool.query("select * from car_category where name = ($1)", [name]);

        res.json(singleCarCategory.rows);
    }catch(err){
        console.error(err.message);

    }
});

//update a car-category
app.put("/car-category/:name", async(req, res)=>{
    try{
        const {name} = req.params; //where
        const {field} = req.body; //set
        const {newValue} = req.body; //set
        console.log(req.params);
        console.log(req.body);
        console.log("Making changes to car-category");
        const singleCarCategory = await pool.query(
            "update car_category set "+ field +  " = $1 where name = $2 returning *",
             [newValue, name]);

        res.json(singleCarCategory.rows);
    }catch(err){
        console.error(err.message);

    }
});

//delete a car-category
app.delete("/car-category/:name", async(req, res)=>{
    try{
        const {name} = req.params;
        console.log("Deleting a car-category with name: ",name);
        const singleCarCategory = await pool.query("delete from car_category where name = $1 returning * ", [name]);

        res.json(singleCarCategory.rows);
    }catch(err){
        console.error(err.message);

    }
});

//DISCOUNT//
//create a DISCOUNT
app.post("/discount", async(req, res)=>{
    try{
        const {discountcode} = req.body; // destructuring the request
        const {discountpercent} = req.body;
        const {name} = req.body;
        const {expirydate} = req.body;

        const newDiscount = await pool.query
        ("INSERT INTO discount (discountcode, discountpercent, name, expirydate) VALUES ($1,$2,$3,$4) Returning *",
        [discountcode, discountpercent, name, expirydate]);

        //send back the newTodo data as a convention
        res.json(newDiscount.rows);
    }catch(err){
        console.error(err.message);
    }
});

// get all discounts
app.get("/discount", async(req, res)=>{
    try{
        console.log("Get discounts request made");
        const allDiscounts = await pool.query("select * from Discount");

        res.json(allDiscounts.rows);
    }catch(err){
        console.error(err.message);

    }
});

//get a specific discount code
app.get("/discount/:discountcode", async(req, res)=>{
    try{
        const {discountcode} = req.params;
        console.log("Get single discount request made");
        const singleDiscount = await pool.query("select * from Discount where discountcode = ($1)", [discountcode]);

        res.json(singleDiscount.rows);
    }catch(err){
        console.error(err.message);

    }
});

//update a discount
app.put("/discount/:discountcode", async(req, res)=>{
    try{
        const {discountcode} = req.params; //where
        const {field} = req.body; //set
        const {newValue} = req.body; //set
        console.log("Making changes to discount");
        const singleDiscount = await pool.query(
            "update Discount set "+ field +  " = $1 where discountcode = $2 returning *",
             [newValue, discountcode]);

        res.json(singleDiscount.rows);
    }catch(err){
        console.error(err.message);

    }
});

//delete a discount
app.delete("/discount/:discountcode", async(req, res)=>{
    try{
        const {discountcode} = req.params;
        console.log("Deleting a discount with discountcode: ",discountcode);
        const singleDiscount = await pool.query("delete from Discount where discountcode = $1 returning * ", [discountcode]);

        res.json(singleDiscount.rows);
    }catch(err){
        console.error(err.message);

    }
});

//BOOKING //
//create a booking
app.post("/booking", async(req, res)=>{
    try{
        const {bookingid} = req.body; // destructuring the request
        const {fromdatetime} = req.body;
        const {bookingstatus} = req.body;
        const {returndatetime} = req.body;
        const {actualreturndatetime} = req.body;
        const {dlno} = req.body;
        const {rno} = req.body;
        const {billid} = req.body;
        const {dropoff_locid} = req.body;
        const {pickup_locid} = req.body;

        const newBooking= await pool.query
        ("INSERT INTO booking (bookingid, fromdatetime, bookingstatus, returndatetime, actualreturndatetime, dlno, rno, billid, dropoff_locid, pickup_locid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) Returning *",
        [bookingid, fromdatetime, bookingstatus, returndatetime, actualreturndatetime, dlno, rno, billid, dropoff_locid, pickup_locid]);

        //send back the newTodo data as a convention
        res.json(newBooking.rows);
    }catch(err){
        console.error(err.message);
    }
});

// get all bookings
app.get("/booking", async(req, res)=>{
    try{
        console.log("Get all bookings request made");
        const allBookings = await pool.query("select * from Booking");

        res.json(allBookings.rows);
    }catch(err){
        console.error(err.message);

    }
});

//get a specific Booking
app.get("/booking/:bookingid", async(req, res)=>{
    try{
        const {bookingid} = req.params;
        console.log("Get single booking request made");
        const singleBooking = await pool.query("select * from Booking where bookingid = ($1)", [bookingid]);

        res.json(singleBooking.rows);
    }catch(err){
        console.error(err.message);

    }
});

//update a Booking
app.put("/booking/:bookingid", async(req, res)=>{
    try{
        const {bookingid} = req.params; //where
        const {field} = req.body; //set
        const {newValue} = req.body; //set
        console.log("Making changes to booking");
        const singleBooking = await pool.query(
            "update Booking set "+ field +  " = $1 where bookingid = $2 returning *",
             [newValue, bookingid]);

        res.json(singleBooking.rows);
    }catch(err){
        console.error(err.message);

    }
});

//delete a booking
app.delete("/booking/:bookingid", async(req, res)=>{
    try{
        const {bookingid} = req.params;
        console.log("Deleting a booking with bookingid: ",bookingid);
        const singleBooking = await pool.query("delete from Booking where bookingid = $1 returning * ", [bookingid]);

        res.json(singleBooking.rows);
    }catch(err){
        console.error(err.message);

    }
});

//BILLING//
//create a BILLING
app.post("/billing", async(req, res)=>{
    try{
        const {billid} = req.body; // destructuring the request
        const {billdate} = req.body;
        const {discountcode} = req.body;

        const newBilling = await pool.query
        ("INSERT INTO Billing (billid, billdate, discountcode) VALUES ($1,$2,$3) Returning *",
        [billid, billdate,discountcode]);

        //send back the newTodo data as a convention
        res.json(newBilling.rows);
    }catch(err){
        console.error(err.message);
    }
});

// get all Billings
app.get("/billing", async(req, res)=>{
    try{
        console.log("Get billings request made");
        const allBillings = await pool.query("select * from Billing");

        res.json(allBillings.rows);
    }catch(err){
        console.error(err.message);

    }
});

//get a specific Billing code
app.get("/billing/:billid", async(req, res)=>{
    try{
        const {billid} = req.params;
        console.log("Get single billing request made");
        const singleBilling = await pool.query("select * from Billing where billid = ($1)", [billid]);

        res.json(singleBilling.rows);
    }catch(err){
        console.error(err.message);

    }
});

//update a Billing
app.put("/billing/:billid", async(req, res)=>{
    try{
        const {billid} = req.params; //where
        const {field} = req.body; //set
        const {newValue} = req.body; //set
        console.log("Making changes to billing");
        const singleBilling = await pool.query(
            "update Billing set "+ field +  " = $1 where billid = $2 returning *",
             [newValue, billid]);

        res.json(singleBilling.rows);
    }catch(err){
        console.error(err.message);

    }
});

//delete a billing
app.delete("/billing/:billid", async(req, res)=>{
    try{
        const {billid} = req.params;
        console.log("Deleting a billing with billid: ",billid);
        const singleBilling = await pool.query("delete from Billing where billid = $1 returning * ", [billid]);

        res.json(singleBilling.rows);
    }catch(err){
        console.error(err.message);

    }
});


app.listen(5000, ()=>{
    console.log("Server is listening on port 5000");
});