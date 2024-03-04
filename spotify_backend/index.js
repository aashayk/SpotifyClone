//npm init : package.json -- This is node project
//npm i express : expressJs package installed

const express = require("express");
const app = express();
const port=8000;

// API : GET -- return hello world
app.get("/",(req,res)=>{
    //req contains all the data for request
    //res contains all the data for response
    res.send("Hello World");
});

app.listen(port, ()=>{
    console.log("App is running on port " + port);
});