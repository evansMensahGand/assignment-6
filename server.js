const express = require("express");

// connect to the database
require("./config/dbConnect");

const app = express();
app.use(express.json());

app.use("/auth", require("./router/authRouter"));
app.use("/user", require("./router/usersRouter"));

app.listen(4000,()=>console.log("server running"));