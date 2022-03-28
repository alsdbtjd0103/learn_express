const express= require('express');
const app=express();
const mongoose = require('mongoose');
console.log(process.env.MONGO_DB);
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;

db.once('open',() => {
    console.log('db connected');
});

db.on('error',(err) => {
    console.log('DB ERROR: ',err);
});

app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));

const port=3000;
app.listen(port,function(){
    console.log(`server with port ${port}`);
});