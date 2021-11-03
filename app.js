const express = require("express");
const app = express();
const cors = require("cors");
const auth = require("./routes/auth");
const user = require("./routes/user");
const game = require("./routes/game");
const review = require("./routes/review");
const admin = require("./routes/admin");
require("dotenv").config();

const PORT = 8000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/auth", auth);
app.use("/user", user);
app.use("/game", game);
app.use("/review", review);
app.use("/admin", admin);

app.get("/ping", (req, res) => {
  res.status(200).json({
    response: "PONG",
  });
});

app.get("*", (req, res) => {
  res.status(400).json({ message: "Invalid API request" });
});

app.listen(PORT, () => {
  console.log("Listening at PORT: " + PORT);
});
