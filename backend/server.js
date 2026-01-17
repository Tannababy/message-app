const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Mongo connection
mongoose
  .connect("mongodb://127.0.0.1:27017/message-app")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
const Message = require("./models/Message");

app.get("/messages", async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

app.post("/messages", async (req, res) => {
  const message = new Message({ text: req.body.text });
  await message.save();
  res.status(201).json(message);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
