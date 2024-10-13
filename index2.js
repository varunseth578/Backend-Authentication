const express= require("express")
const jwt = require("jsonwebtoken");
const jwtPassword = "12345";

const app = express();
app.use(express.json());

const ALL_USERS=[
    {
        username: " ivarunseth@gmail.com",
        password: " 123",
        name:"varun seth"

}
,{
    username: " varun@gmail.com",
        password: " 123",
        name:"varun"


},{
    username: " seth@gmail.com",
        password: " 123",
        name:" seth"


}];
function userExists(username,password){
    //write logic to return true or false if this user exists
    //in all_user array


    let userExists = false;
    for( let i = 0 ; i < ALL_USERS.length;i++){
        if (ALL_USERS[i].username == username && ALL_USERS[i].password==password){
            userExists = true ;
        }
    }

    return userExists;
}
app.post("/signin",function (req,res){
    const username = req.body.username;
    const password = req.body.password;

    if (!userExists(username,password)){
        return res.status(403).json({
            msg:"user doesnt exist in our memory db",
        });
    }
    var token = jwt.sign({username:username},jwtPassword);
    return res.json({
        token,
    });
});
app.get("/users",function(req,res){
    const token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token,jwtPassword);
        const username = decoded.username;
        // return a list of users other this username 
    }
    catch (err){
        return res.status(403).json({
            msg:" invalid token",

        });
    }
});

/*
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


})
    */

app.listen(3000)
