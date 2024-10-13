const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "1234";

mongoose.connect("your_mongo_url",);
const user = mongoose.model("user",{
name: String,
username : String,
password : String,
});

const app = express();
app.use(express.json());

function userExists(username,password){
    //
}

app.post("/signin",async function (req,res) {
   const username = req.body.username;
   const password = req.body.password;
   
   if (!userExists(username,password)){
    return res.status(403).json({
        msg: "user doesnt exist in our db",
    });
   }
   var token = jwt.sign({username : username},jwtPassword);
   return res.json({
    token,
   });
});
app.get("/users",function(req,res){
    const token = req.headers.authorization;
    const decoded = jwt.verify(token,jwtPassword);
    const username = decoded.username;

    res.json({
        users:ALL_USERS.filter(function(value){
            if(value.username == username){
                return false
            }
            else {
                return true;
            }
        })
    })

});

app.listen(3000)
