const express= require('express');
const app=express();
const mongoose = require('mongoose');
const uri='mongodb+srv://ysyss:ysyss@cluster0.r3buu.mongodb.net/test?retryWrites=true&w=majority';
var db = mongoose.connection;
mongoose.connect(uri);
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