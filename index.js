var express = require('express');
var app = express();
var http = require('http');
var server = require('http').createServer(app);
var api = 'ada40a616d1ae5423a1ae8281bfe517c';
var bodyParser = require('body-parser');



var lalBusDetails=[
	{
		"name":"Ganesh Mallya",
		"emailID":"ganumallya@yahoo.co.in",
		"contactNo":9036444787,
		"status": 1
	},
	{
		"name":"Akilesh",
		"emailID":"akilesh@gmail.com",
		"contactNo":903644786,
		"status": 1
	},
	{
		"name":"Kiran Nara",
		"emailID":"kiran@gmail.com",
		"contactNo":9036444785,
		"status": 0
	},
	{
		"name":"Kunal",
		"emailID":"kunal@gmail.com",
		"contactNo":9036444784,
		"status": 1
	}
];


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.get('/webhook',function(req,res){
	res.write('<h1> In Webhook </h1>');
});


app.get('/lalbus',function(req,res){
	res.write('<h1> Welcome to Lalbus </h1>');
});

app.post('/lalbus',function(req,res){
	var name='';
	var status='';
	var pNo=parseInt(req.body.result.parameters["contactNo"]);
	var found = 0;
	var email = '';
	var responseLal ='';
	var iName =req.body.result.metadata["intentName"];
	var lalfinalResponse;	console.log(iName);
	for(var i=0;i<lalBusDetails.length;i++){
		if(lalBusDetails[i].contactNo == pNo){
			name=lalBusDetails[i].name;
			status =lalBusDetails[i].status;
			pNo = lalBusDetails[i].contactNo;
			found = 1;
		}
	};

	if (found){
		switch(iName){
			case 'Icancel':
				responseLal = iCancelFunc(pNo);
				console.log("Response LaL :: "+responseLal);
				break;
			case 'Irefund':
				responseLal = iRefundFunc(name);
				console.log("Response LaL :: "+responseLal);
				break;
			case 'iWrongDebit':
				responseLal = iWrongDebitFunc(name);
				console.log("Response LaL :: "+responseLal);
				break;
			 default:
				responseLal = 'Sorry i couldnt understand the intention of this question';
		};

		res.status(200);
		lalfinalResponse = {
  						"speech": responseLal,
  						"displayText": responseLal
  						};
		res.send(lalfinalResponse);
	}else{
		responseLal='Sorry :( , we couldnt find your emailID in our database';
		res.status(200);
		lalfinalResponse = {
  						"speech": responseLal,
  						"displayText": responseLal
  						};
		res.send(lalfinalResponse);
		
	};
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
};


function iCancelFunc(pno){
	for (var j=0; j<lalBusDetails.length;j++){
		if(lalBusDetails[j].contactNo = pno){
			if(lalBusDetails[j].status){
				lalBusDetails[j].status=0;
				return 'The booking has been sucessfully cancelled ' + lalBusDetails[j].name + " ,Thanks for using Lalbus Chatbot";
			}else{
				return 'Hey ' + lalBusDetails[j].name + ", i couldnt find any active booking under your name.";
			}
		}
	}
};

function iRefundFunc(pno){
	return 'Hey '+ pno +', the refund is already initiated from our side :) , it should reach you anytime soon';
};
function iWrongDebitFunc(pno){
	return 'Hey '+ pno + ', Sorry for the trouble caused, we have started refund process, the money will be in your account in 5 working days';
};