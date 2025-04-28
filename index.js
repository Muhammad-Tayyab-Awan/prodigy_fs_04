const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const connectDB = require("./utils/connectDB");
const authRouter = require("./routes/auth");
const verifyLogin = require("./middlewares/verifyLogin");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(verifyLogin);

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/auth", authRouter);

app.all(/.*/, (req, res) => {
  res.render("not-found", {
    error: "Page not found"
  });
});

app.listen(PORT, async () => {
  console.clear();
  await connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
