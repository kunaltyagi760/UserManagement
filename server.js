const express = require("express");
const connectDB = require("./config/db");
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
require("dotenv").config();

connectDB();
const app = express();

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
app.use(morgan('tiny', { stream: accessLogStream }))
app.use(express.json());

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/user", require("./routes/userRouter"));

app.listen(process.env.PORT, () => console.log(`Server running on port http://localhost:${process.env.PORT}`));