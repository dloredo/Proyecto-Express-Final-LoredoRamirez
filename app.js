const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "proyecto_final_programacion"
})

const publicDirectory = path.join(__dirname , "./public")
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use(cookieParser());

app.set('view engine' , 'hbs');

db.connect( (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Base conectada!....")
    }
});

//Definir routes
app.use('/' , require('./routes/pages'));


app.listen(8080, () => {
    console.log("Server iniciado en puerto 8080");
});