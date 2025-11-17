const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json()); 
const db = require("./models");


// Routers
const postRouter = require("./routes/Post");
app.use("/posts", postRouter);

const userRouter = require("./routes/Users");
app.use("/auth", userRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});