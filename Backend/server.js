const express = require("express");
const app = express();

const rooms = ["genreal", "tech", "finance", "crypto"];
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");

// being able to recieve data from frontend
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// to allow communication in frontend and backend
app.use(cors());
app.use("/api", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
// server can only send data after receiving command from client
// but with web sockets it can do it individually without commands from the client
// also client can send data to the server

require("./connection");

const server = require("http").createServer(app);
const PORT = process.env.Port||5001;

server.listen(PORT, () => {
  console.log("listening to port", PORT);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  socket.off("setup", (userData) => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
