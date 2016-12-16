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
  			var finalSpeech = '';
  			var finalTemperature = parseInt(msg.main["temp"]) - 273.15; 
  			finalTemperature = Math.round(finalTemperature);
  			res.status(200);
  			var pWeather = ["Weather is very pleasant right now","The weather is too good at the moment","Its neither too hot nor too cold"];
  			var cWeather = ["Its very chilling out here","Damn its cold","I will be freezed if i was there","its super cold out there"];
  			var hWeather = ["Hot like frying pan","i am gonna melt away at this temperature, its just too hot","Damn its hot"];
  			var rWeather = ["Weather is cloudy","lot of clouds in the sky","Its gonna rain today"];
  			if (finalTemperature>30){
  				finalSpeech += hWeather[Math.floor(Math.random()*(hWeather.length))] + " its " + finalTemperature + " Degree right now";
  			}else if(finalTemperature>15){
  				finalSpeech += pWeather[Math.floor(Math.random()*(pWeather.length))] + " its " + finalTemperature + " Degree right now";
  			}else{
  				finalSpeech += cWeather[Math.floor(Math.random()*(cWeather.length))] + " its " + finalTemperature + " Degree right now";
  			};

  			var tempID = parseInt(msg["weather"][0].id);
  			if(tempID<300){
  				finalSpeech += ", and its raining heavily too";
  			}else if(tempID<400){
  				finalSpeech += ", and its drizling";
  			}else if(tempID<600){
  				finalSpeech += ", and its raining now";
  			}else if(tempID<700){
  				finalSpeech += ", and its snowing too";
  			}else if(tempID<800){
  				finalSpeech += " ";
  			}else if(tempID==800){
  				finalSpeech += " ,and sky looks clear";
  			}else if(tempID <900){
  				finalSpeech += ", and there is clouds scaterred over the sky";
  			}

  		 finalResponse = {
  						"speech": finalSpeech,
  						"displayText": finalSpeech
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