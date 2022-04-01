const express= require('express');
const app=express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const uri='mongodb+srv://ysyss:ysyss@cluster0.r3buu.mongodb.net/test?retryWrites=true&w=majority';

//other setting
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json()); //json 형식의 데이터를 받음 -> 이걸 해야 req.body를 통해 form 데이터를 받을 수 있음]
app.use(bodyParser.urlencoded({extended:true})); // extended 알고리즘 이용


//db setting
var db = mongoose.connection;
mongoose.connect(uri);
db.once('open',() => {
    console.log('db connected');
});

db.on('error',(err) => {
    console.log('DB ERROR: ',err);
});

//db schema
var contactSchema = mongoose.Schema({
	name:{type:String, required: true, unique:true},
	email:{type:String},
	phone:{type:String}
})
var Contact = mongoose.model('contact', contactSchema);

//routes 설정
app.get('/', (req,res) => {
	res.redirect('/contacts');
})
app.get('/contacts', (req,res) => {
	Contact.find({},function(err,contacts){
		if(err) return res.json(err);
		res.render('contacts/index',{contacts:contacts});
	});
});
app.get('/contacts/new',(req,res) => {
	res.render('contacts/new');
});
app.post('/contacts',(req,res) => {
	Contact.create(req.body,(err,contact) => {
		if(err) return res.json(err);
		res.redirect('/contacts');
	});
});





//port setting
const port=3000;
app.listen(port,function(){
    console.log(`server with port ${port}`);
});