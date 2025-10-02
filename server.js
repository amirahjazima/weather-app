const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const { router } = require("./routers");

dotenv.config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(3000, () => {
    console.log("listening");
});