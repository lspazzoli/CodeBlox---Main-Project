var express = require("express");
var app = express();
var mongo = require('mongojs');
var db = mongo('dbPerson', ['persons']);
var bodyParser = require("body-parser");
var bcrypt = require('bcrypt');
var SALT = "$2a$10$.b.ov84QXKdDd2CC7PZPl.";
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded());
var router = express.Router();

var server = app.listen(process.env.PORT || 3000,function(){
  var port = server.address().port;
  console.log("Server running on port: " + port);
});

//Error handling used by all endpoints
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// Returns a person with existing email
app.get('/returnUser/:email/:pass', function(req, res){
    var emailadd = req.params.email;
    var password = req.params.pass;
    db.persons.findOne({email: emailadd}, function(err, doc){
        bcrypt.hash(password, SALT, function(err, hash){
            if(doc != null && hash == doc.password1){
                res.json(doc);
            } else {
                res.json(null);
            }
        });

    });
});

app.get('/returnUser/:email', function(req, res){
    var emailadd = req.params.email;
    db.persons.findOne({email: emailadd}, function(err, doc){
        res.json(doc);
    });
});

app.post('/registration', function(req, res){
    console.log(req.body.email);
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(req.body.password1, SALT, function(err, hash){
            req.body.password1 = hash;
            db.persons.insert(req.body, function(err, doc){
               res.json(doc);
               console.log(req.body);
            });
        });
   });
});

