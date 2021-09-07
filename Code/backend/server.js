const express = require("express")
const app = express()   
const cors = require('cors');
const port = process.env.PORT || 5000
const mongoose = require('mongoose');
const userRouter = require("../backend/routers/userRouter.js");

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://user1:user1@cluster0.0tlap.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, dbName: 'crm'}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`server is listening on port`, port)
})

// Exports app for testing
module.exports = app