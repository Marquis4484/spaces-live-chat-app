const express = require("express"); // line of code to use Express.js to create RESTful APIs
const app = express();
const http = require("http").Server(app); //allows data to be transfered between the client and server
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors()); //allows data to be transfered between the client and server domains

const io = require("socket.io")(http, {
   cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
   },
});

let users = []; // Array of users collected from the client folder. Check join room for more details

io.on("connection", (socket) => {
   // code that runs whenever a user visits the website
   console.log(`Chat user with ID: ${socket.id} user just connected!`);

   socket.on("joinRoom", (data) => {
      //  join room event that sends users to a custom room based on user input
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
   });

   socket.on("message", (data) => {
      // collects user message data then sends message to Chat Window component to be displayed
      // io.emit("messageResponse", data); previous line of code broadcasts messages to everyone
      socket.to(data.room).emit("messageResponse", data);
      console.log(data.room);
   });

   //Listens to when a new user joins the server
   socket.on("newUser", (data) => {
      //Adds the new user to the list of users

      users.push(data);
      console.log(users);
      //Sends the list of users to the client
      io.emit("newUserResponse", users);
   });

   socket.on("disconnect", () => {
      console.log(`Chat user with ID: ${socket.id} disconnected`);
      //updates the list of users when a user disconnects from the server
      users = users.filter((user) => user.socketID !== socket.id);

      //sends the list of users to the client
      io.emit("newUserResponse", users);
      socket.disconnect();
   });
});

app.get("/api", (req, res) => {
   // basic rest api
   res.json({
      message: "Hello world",
   });
});

http.listen(PORT, () => {
   // port created for backend
   console.log(`Server listening on ${PORT}`);
});
