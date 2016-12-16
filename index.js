var express = require('express');
var app = express();
var http = require('http');
var server = require('http').createServer(app);
var api = 'ada40a616d1ae5423a1ae8281bfe517c';
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.get('/webhook',function(req,res){
	res.write('<h1> In Webhook </h1>');
});

app.post('/webhook', function (req, res) {

	var city = req.body.result.parameters["geo-city"];
	console.log(city)
   
  	getWeather(city,function(t,msg){
  		
  		if(t){
  			var finalTemperature = parseInt(msg.main["temp"]) - 273.15; 
  			finalTemperature = Math.round(finalTemperature);
  			res.status(200);
  		 finalResponse = {
  						"speech": "Temperature right now is "+finalTemperature,
  						"displayText": "Temperature right now is "+finalTemperature
  						};
		res.send(finalResponse);
  		}
  	});

  
});

app.get('/',function(req,res){
	res.write('<h1>Home Page</h1>');
})


app.listen(app.get('port'),function(){
	console.log('Example app listening on port 5000')
})


function getWeather(cName,callback){
	
	var result = '';
	var options = {
	host:'api.openweathermap.org',
	path:'/data/2.5/weather?q='+cName+'&APPID='+api,
	method:'GET'
	};
	console.log(options.path);
	var req = http.request(options,function(res){
		var output = '';
		console.log(res.statusCode);
		res.setEncoding('utf8');

		res.on('data',function(chunk){
			output = output + chunk;
		});

		res.on('end',function(){
			result = JSON.parse(output);
			console.log(result.main["temp"]);
			callback(1,result);

		})
	});

	req.on('error',function(err){
		console.log('Error in HTTP request  '+err);
		callback(0);
	});

	req.end();
	callback(0);
}