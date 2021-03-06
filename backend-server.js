var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();

var port = process.env.PORT || 3002;

// Connect to DB
mongoose.connect("mongodb://localhost:27017/super-chat");

app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

require('./backend-routes.js')(app)

process.on('uncaughtException', function(err) {
	console.log(err);
});

//Start Server
app.listen(port, function() {
	console.log("Express server listening on port " + port);
});