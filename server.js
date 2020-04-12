var http = require('http');
var express = require('express');

/**************************************
Configuration section
***************************************/
var app= express();
var bodyParser= require('body-parser');
app.use(bodyParser.json());

/**************************************
Allow CORS Policy
***************************************/

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//to serve HTML
var ejs=require('ejs');
console.log(__dirname);
app.set('views',__dirname + '/public'); // the folder that contains HMTL Files
app.engine('html',ejs.renderFile);
app.set('view engine',ejs);

//to serve static files
app.use(express.static(__dirname+'/public')); //server all files from this location

/**************************************
DB Connection settings
***************************************/

var mongoose=require('mongoose');
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
var db=mongoose.connection;

/**************************************
Web server functionality
***************************************/
app.get('/', function(req, res) {
    //console.log("req on root page");
    //res.send("<h1 style='color:red;'>Hello world!</h1>");
    res.render('index.html');
});

app.get('/admin',(req, res)=>{
    res.render('admin.html');
});

app.get('/about',function(req, res){
    res.send("I'm Isabel");
    //render some html page (name,)
    //when user visits about
});

/**************************************
API Functionality
***************************************/
//var catalog=[];
var ItemDB; //this is model for DB Items

app.get('/api/items',function(req, res){
    //var data=[];
    //res.json(data);
    //res.json(catalog);
    ItemDB.find({}, function(error,data){
        if(error){
            console.log("Error reading items");
            res.status(500);
            res.status(error);
        }
        //no error
        res.status(200);
        res.json(data);
    });
});

app.get('api/items/:name',function(req,res){
    var name=req.params.name;
    //res.send(name);
    ItemDB.find({user:name},function(error,data){
        if(error){
            console.log("Error reading items");
            res.status(500);
            res.status(error);
        }
        //no error
        res.status(200);
        res.json(data);
    });
});

app.get('/api/items/PriceLowerThan/:price',function(req,res){
    var val= req.params.price;
    ItemDB.find({price:{$lte:val}},function(error,data){
        if(error){
            console.log("Error reading items");
            res.status(500);
            res.status(error);
        }
        //no error
        res.status(200);
        res.json(data);
    })
});

app.post('/api/items', function(req, res){
    //console.log('Admin wants to save an item');
    //var item=req.body;
    //console.log(item);
    //item.id=catalog.length + 1;
    //catalog.push(item);
    var itemForMongo = ItemDB(req.body);
    itemForMongo.save(function(error,savedItem){
        if(error){
            console.log("Error saving object", error);
            res.status(500);//http status 500 server error
            res.send(error);
        }
        //no error
        console.log("Object saved!!");
        res.status(201); //201 : created
        res.json(savedItem);
    });
    //res.json(item);
});
/**************************************
Start server and DB check connection
***************************************/
db.on('open',function(){
    console.log("Connected to DB");

//Data types allowed for schemas: String, Number, Data, Buffer, Boolean, Object ID, Array

    var itemSchema=mongoose.Schema({
        code:String,
        title:String,
        price:Number,
        description:String,
        category:String,
        image:String,
        user:String
    });

    //create the object constructor
    ItemDB = mongoose.model('itemsCH7', itemSchema);
});

db.on('error',function(details){
    console.log("DB Connection Error")
    console.log("Error details: "+ details);
});

app.listen(8080, function(){
    console.log("Server running at localhost: 8080")
});