const express = require("express")
const app = express()
const mongoose = require("mongoose")
const {Post }= require("./schema/Post") 
const dbConnection = require('./database/connection');
const cors = require("cors");



dbConnection()

//middle ware
app.use(express.json())
app.use(express.urlencoded({extended: true}));


app.use('/api/auth',require('./routes/authRoutes')


const PORT = process.env.port || 3000;

app.listen(PORT ,()=>{
    console.log(`server listening on port ${PORT}`)
})

    //error handling error
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({
     status: 500,
     message: err.message,
     body:{}
    });
  })
