const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose.connect("your_mongo_url");
const User = mongoose.model("user", {
  name: String,
  username: String,
  password: String,
});

app.use(express.json());

app.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const userExists = await User.findOne({ email: username });

  if (userExists) {
    return res.status(400).send("user exist in our db");
  }
  const user = new User({
    name: name,
    email: username,
    password: password,
  });
  user.save();

// await User.create({name,email:username,password});

  res.json({
    "msg": "user created successfully",
  });
});
app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, jwtPassword);
  const username = decoded.username;

  res.json({
    users: ALL_USERS.filter(function (value) {
      if (value.username == username) {
        return false;
      } else {
        return true;
      }
    }),
  });
});

app.listen(3000);
