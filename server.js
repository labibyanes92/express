// console.log("hello")

//1-import express
const express = require("express");

//2-init express
const app = express();

//3- create your endpoints
// app.get("/", (req, res) => {
//   res.send("Welcome to Ws-Express");
// });

//4-run server
const port = 6500;
app.listen(port, (err) => {
  err
    ? console.log(err)
    : console.log(`the server is running on port ${port}...`);
});

//5-serve the static file
app.use(express.static("public"));

//6-parse the data
app.use(express.json());

let users = [
  { name: "med ", age: 25, id: 1 },
  { name: "ali", age: 16, id: 2 },
  { name: "semo", age: 35, id: 3 },
];

console.log(users);

//Get All users
//Get '/api/users'
//@Desc: get list of users
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

//Add new user
//Post '/api/users'
//@Desc: Add new users
app.post("/api/users", (req, res) => {
  let newUser = { ...req.body, id: Math.random() };
  users.push(newUser);
  res.status(200).json({
    msg: "User added with success",
    users,
  });
});

//Delete user
//Delete '/api/users/:id'
//@Desc: delete user with id
app.delete("/api/users/:id", (req, res) => {
  let id = Number(req.params.id);
  users = users.filter((user) => user.id !== id);
  res.status(200).json({
    msg: "User has been deleted",
    users,
  });
});

//Update user
//Update '/api/users/:id'
//@Desc: update user with id
app.put("/api/users/:id", (req, res) => {
  let id = Number(req.params.id);
  users = users.map((user) =>
    user.id === id ? { ...user, ...req.body } : user
  );
  res.status(200).json({
    msg: "User has been updated",
    users,
  });
});
