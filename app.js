var express = require('express');
var app = express();
var port = 3003;

//bcrypt start
var bcrypt = require("bcrypt");
const saltRounds = 10;


//bcrypt end

//mongoose start
var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/blog");
var User = require("./models/user.model")
var Product = require('./models/product.model');
//mongoose end

//create route object start
var route = express.Router();
//create route object end

//bodyparser start
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
//bodyparser end

//register route object as middleware start
app.use('/api', route);
//register route object as middleware end

app.use(express.static(__dirname + "/views"));
app.set('view engine', "pug");
//routing start

//cors start
var cors = require('cors');
var originsWhitelist = [
'http://localhost:4200', //this is front end url
];
var corsOptions = {
origin: function(origin, callback){
var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
callback(null, isWhitelisted);
},
credentials:true
}
app.use(cors(corsOptions));

//cors end


let Categorie = require('./models/category.model.js');
route.get('/categories',function(req,res){
    console.log('Inside categories');
    Categorie.find({},function(err,categories){
        res.json(categories);
    })
})

route.post('/products',function(req,res){
	
	Product.create(req.body,function(err,product){
		if(err){
			console.log('The error is ',err)
		}
		res.json({message : 'Prodcut saved'})
		
	})
	
});

route.put('/products/:id',function(req,res){
	
	Product.update({_id : req.params.id},req.body,function(err,product){
		if(err){
			console.log('The error is ',err)
		}
		res.json({message : 'Prodcut updated'})
		
	})
	
});

route.get('/products/:id',function(req,res){
	
	Product.findOne({_id : req.params.id},function(err,product){
		if(err){
			console.log('The error is ',err)
		}
		res.json(product)
		
	})
	
});

route.get('/products',function(req,res){
	
	Product.find({},function(err,products){
		if(err){
			console.log('The error is ',err)
		}
		res.json(products)
		
	})
	
});


route.delete('/products/:id',function(req,res){
	
	Product.remove({_id : req.params.id},function(err,product){
		if(err){
			console.log('The error is ',err)
		}
		res.json({message : 'Product deleted'})
		
	})
	
});

route.put('/products/:id',function(req,res){
	
	Product.update({_id : req.params.id},req.body,function(err,product){
		if(err){
			console.log('The error is ',err)
		}
		res.json({message : 'Product deleted'})
		
	})
	
});


route.post('/signup', function (req, res) {
    //hash password start
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            // Store hash in your password DB.
            req.body.password = hash;
            User.create(req.body, function (err, user) {
                res.json(user)
            })
        });
    });

    //hash password end


});

route.get('/test', function (req, res) {

    res.render('index')
});


route.post('/checklogin', function (req, res) {
    console.log("Body is ", req.body)
    User.findOne({ email: req.body.email }, function (err, user) {
        console.log('The login record is ', req.body.password, user)
        bcrypt.compare(req.body.password, user.password, function (err, loginres) {
            if (loginres) {
                res.json({status : 1})
            }
            else {
                res.json({status : 0})
            }
        })
    });
    // res.render('home');
})

//routing end

//to parse request start
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//to parse request end


app.listen(port, function () {
    console.log(`Server starts at port ${port}`)

});