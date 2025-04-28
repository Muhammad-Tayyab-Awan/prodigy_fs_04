const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json("Welcome to Real time chat app");
});

app.listen(PORT, () => {
  console.clear();
  console.log(`Server running on http://localhost:${PORT}`);
});
