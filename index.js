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


// Product Details

var extenderDetails = [
	{
		"id":1,
		"name":"Nighthawk® X4 AC2200 ",
		"modelNo":"EX7300",
		"price":500,
		"warranty":1,
		"releaseDate":"June 2016",
		"ghz":[2.4,5],
		"coverage":930,
		"maxspeed":2.2,
		"discount":15,
		"rating":1,
		"shipping":0,
		"stock":15,
		"refund":"30 Days Refund",
		"support":"90 days from date of purchase 24/7",
		"analytics":1,
		"antennas":0,
		"features":"Works with any wifi router,Dual Band",
		"url":"www.netgear.com"
	},
	{
		"id":2,
		"name":"Nighthawk® X4 AC1900 ",
		"modelNo":"EX7400",
		"price":450,
		"warranty":1,
		"releaseDate":"Jan 2016",
		"ghz":[2.4,5],
		"coverage":700,
		"maxspeed":1.9,
		"discount":0,
		"rating":2,
		"shipping":0,
		"stock":10,
		"refund":"No Refund",
		"support":"60 days from date of purchase 24/7",
		"analytics":1,
		"antennas":1,
		"features":"Dual Band Wifi,Dual Core 1 Ghz Processor,Fast Lane Technology,USB3.0",
		"url":"www.netgear.com"
	},
	{
		"id":3,
		"name":"Wifi Range Extender Essential Edition",
		"modelNo":"EX6400",
		"price":200,
		"warranty":1,
		"releaseDate":"March 2015",
		"ghz":[2.5,5],
		"coverage":400,
		"maxspeed":1,
		"discount":0,
		"rating":3,
		"shipping":0,
		"stock":20,
		"refund":"No Refund",
		"support":"14 days from date of purchase 24/7",
		"analytics":0,
		"antennas":1,
		"features":"Fast Lane Technology,Cheap,Dual Band",
		"url":"www.netgear.com"
	}
];
var wifiDetails =[
	{
		"id":1,
		"name":"Nighthawk X10 AD7200",
		"modelNo":"R9000",
		"price":5000,
		"warranty":2,
		"releaseDate":"November 2016",
		"ghz":[2.3],
		"connectDevices":4,
		"maxspeed":5,
		"discount":15,
		"rating":2,
		"shipping":0,
		"stock":10,
		"refund":"No Refund",
		"features":"Ultra Smooth 4k Streaming,Vr Gaming and Instant Downloads",
		"url":"www.netgear.com"
	},
	{
		"id":2,
		"name":"Nighthawk X8 AC5300",
		"modelNo":"R8500",
		"price":4500,
		"warranty":2,
		"releaseDate":"December 2016",
		"ghz":[2.5],
		"connectDevices":6,
		"maxspeed":4,
		"discount":15,
		"rating":3,
		"shipping":0,
		"stock":15,
		"refund":"30 Days Refund",
		"features":"Amplified Wifi Range,Port Aggregation, 2 extra ports",
		"url":"www.netgear.com"
	},
	{
		"id":3,
		"name":"Nighthawk X6 AC3200",
		"modelNo":"R8000",
		"price":4000,
		"warranty":1,
		"releaseDate":"January 2016",
		"ghz":[2.5,5],
		"connectDevices":6,
		"maxspeed":2.5,
		"discount":0,
		"rating":4,
		"shipping":0,
		"stock":12,
		"refund":"30 Days Refund",
		"features":"Tri Band Technology",
		"url":"www.netgear.com"
	},
	{
		"id":4,
		"name":"Nighthawk® X4S AC2600 Smart WiFi Gaming Router",
		"modelNo":"R7800",
		"price":4000,
		"warranty":1.5,
		"releaseDate":"March 2016",
		"ghz":[4],
		"connectDevices":4,
		"maxspeed":4,
		"discount":10,
		"rating":1,
		"shipping":20,
		"stock":11,
		"refund":"30 Days Refund",
		"features":"Low Ping and Best Stream Quality",
		"url":"www.netgear.com"
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
		responseLal='Sorry :( , we couldnt find your Mobile in our database';
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
});


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
		if(lalBusDetails[j].contactNo == pno){
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

		// Webhook for the Modem requests

app.post('/modem',function(req,res){
	var mVaction = req.body.result.action;
	var mContext = req.body.result.contexts;
	var mVmodel='';
	var mVtype=[];
	var mVCount;
	var tBest=false;
	var tCheap=false;
	var tFast=false;
	var tOffer = false;
	var tWarranty = false;
	var tDevices = false;
	var tempContext;
	var mVfeature;
	var finalResponse;

	var speech = '';
	var itemDetail;
	console.log('Got a requuest');

	if(mVaction == 'iDirect'){
		mVtype = req.body.result.parameters.devicetype;
			
			tempContext = {
				"name":"contextone",
				"parameters":{
					"devicetype":mVtype
				}
			};

			finalResponse = {
					"speech":"Is there any specific model no. you want to know more about or do i just list out all our "+mVtype+" Models?",
					"displayText":"Is there any specific model no. you want to know more about or do i just list out all our "+mVtype+" Models?",
					"contextOut":[tempContext]
			}
			res.send(finalResponse);
		}else if(mVaction == 'iFeature'){
			mVtype = req.body.result.parameters.devicetype;
			mVfeature = req.body.result.parameters.feature;

			//decides the feature 

				switch(mVfeature){
				case 'cheap':
					tCheap = true; 
					break;
				case 'best':
					tBest = true;
					break;
				case 'fast':
					tFast = true;
					break;
				case 'offer':
					tOffer = true;
					break;
				case 'warranty':
					tWarranty=true;
					break;
				case 'device':
					tDevices=true;
					break;
			};

			//speech formation begins

			if(tBest){
				if(mVtype=='router'){
					itemDetail = mFbest(wifiDetails);
					console.log('entered Best Router');

				}else if(mVtype=='extender'){
					itemDetail = mFbest(extenderDetails);

				}else{
					itemDetail = wifiDetails[1];
				}
				
				speech =  itemDetail.name + ' is the best one as per me. But dont take my word for it ,, Shoot me with any question to know more about this product. ,, PS : I hope you do buy it ;)' ;

			}else if(tCheap){

				if(mVtype=='router'){
					itemDetail = mFcheap(wifiDetails);
				}else if(mVtype=='extender'){
					itemDetail = mFcheap(extenderDetails);
				}
				
				speech = itemDetail.name + 'is the cheapest of all , do you want to know anything other then the price for this product? or do you want to straight away buy it ?' ;
			}else if(tFast){
				if(mVtype=='router'){
					itemDetail = mFfast(wifiDetails);
				}else if(mVtype=='extender'){
					itemDetail = mFfast(extenderDetails);
				}
				
				speech = 'Every '+mVtype+' is fast enough in our catalouge, but "'+itemDetail.name + '"is just a step ahead of its colleagues and wins the competition in the Speed Category. ,,Would you like to know anything else about this product or do you want to buy this product?' ;
			}else if(tOffer){
				if(mVtype=='router'){
					itemDetail = mFOffer(wifiDetails);
				}else if(mVtype=='extender'){
					itemDetail = mFOffer(extenderDetails);
				}
				
				speech = 'The ' + mVtype + 'with best offer is '+itemDetail.name + '. It has '+itemDetail.discount+ '% discount on MRP. Would you like to know anything else about this product or do you want buy this product?' ;
			}else if(tWarranty){
				if(mVtype=='router'){
					itemDetail = mFOffer(wifiDetails);
				}else if(mVtype=='extender'){
					itemDetail = mFOffer(extenderDetails);
				}
				speech = "In that case , i am sure you will like our "+itemDetail.name+". It has the warranty of 2 years. Would you like to know anything else about this product?" ;
			}
				else{
				if(mVtype=='router'){
					itemDetail = wifiDetails[2];
					console.log(itemDetail);
				}else if(mVtype=='extender'){
					itemDetail =extenderDetails[2];
				}
					speech = "In that case "+itemDetail.name + ' would be perfect for you . Let me know what else would you like to know about this product?' ;
			};
				
				
			
			// Speech formation ends response generation begins

			tempContext = {
				"name":"contextone",
				"parameters":{
					"devicetype":mVtype,
					"feature":mVfeature,
					"modelno":itemDetail.modelNo || 'R9000'
				}
			};

			finalResponse = {
					"speech":speech,
					"displayText":speech,
					"contextOut":[tempContext]
			}
			res.send(finalResponse);

		}else if(mVaction == 'iProductFeature'){
			mVtype = req.body.result.parameters.devicetype;
			mVfeature = req.body.result.parameters.epFeature;
			mVmodel = req.body.result.parameters.modelno;
			mVmodel = mVmodel.toUpperCase();
			var tempresult;
			if(mVtype=='router'){
				tempresult=getDetails(wifiDetails,mVmodel,mVfeature);
			}else if(mVtype=='extender'){
				tempresult=getDetails(extenderDetails,mVmodel,mVfeature);
			}

			if(tempresult.found==0){
				tempresult.speech = "Sorry , we dont have the information for that particular feature of the "+mVtype +" "+mVmodel;
			}
			tempContext = {
				"name":"contextone",
				"parameters":{
					"devicetype":mVtype,
					"feature":mVfeature,
					"modelno":mVmodel
				}
			};
			var tempR = (Math.random() * 10);

			if(tempR>50){
				finalResponse = {
					"speech":tempresult.speech+' ,, What else would you like to know about this product ?',
					"displayText":tempresult.speech+' ,, What else would you like to know about this product ?',
					"contextOut":[tempContext]
			}
			}else{
				finalResponse = {
					"speech":tempresult.speech+'. Would you like to buy it ?',
					"displayText":tempresult.speech+'. Would you like to buy it ?',
					"contextOut":[tempContext]
			}
			}
			
			res.send(finalResponse);

		}else if(mVaction == 'iList'){
			mVtype = req.body.result.parameters.devicetype;

			var tempType;
			if (mVtype=='router'){
				tempType=wifiDetails;
			}else if(mVtype=='extender'){
				tempType=extenderDetails;
			}
			speech = "<b>Model No.</b>	<b>Name</b>,,";
			for(var i=0;i<tempType.length;i++){
				speech = speech + tempType[i].modelNo +"	"+tempType[i].name+" ,,";
			}
			tempContext = {
				"name":"contextone",
				"parameters":{
					"devicetype":mVtype
				}
			};

			finalResponse = {
					"speech":speech + ",, Please enter the MODEL NO. of the product from the list, for which you would like to know more about.",
					"displayText":speech+",, Please enter the MODEL NO. of the product from the list, for which you would like to know more about.",
					"contextOut":[tempContext]
			}
			res.send(finalResponse);
		}else if(mVaction='Amodelno'){
			var mVtype = req.body.result.parameters.devicetype;
			var mvModels = req.body.result.parameters.modelno;
			mvModels = mvModels.toUpperCase();
			var found = false;
			if(mVtype=='router'){
				for(var i=0;i<wifiDetails.length;i++){
					if(wifiDetails[i].modelNo == mvModels){
						found = true;
					}
				}
			}else{
				for(var i=0;i<extenderDetails.length;i++){
					if(extenderDetails[i].modelNo == mvModels){
						found = true;
					}
				}
			}

			if(found){
				finalResponse = {
					"speech":"Aha, Thats one of the best model , What would you like to know about that model. ?",
					"displayText":"Aha, Thats one of the best model , What would you like to know about that model. ?",
					"contextOut":[tempContext]
						}
					res.send(finalResponse);
			}else{
				finalResponse = {
					"speech":"I am afraid, we dont have any Product with that Model No.,, Can you please cross check and enter the Model No. Again?",
					"displayText":"I am afraid, we dont have any Product with that Model No.,, Can you please cross check and enter the Model No. Again?",
					"contextOut":[tempContext]
						}
					res.send(finalResponse);
			}
		}else if(mVaction=='iCompare'){
			console.log("entered compare block")
			mVtype = req.body.result.parameters.devicetype;
			var mvModels = req.body.result.parameters.modelno;
			var tempSpeech='';
			var mVtype1 = mVtype;
			if(mVtype=='router'){
				mVtype=wifiDetails;
			}else{
				mVtype=extenderDetails;
			}
			for (var i=0;i<mvModels.length;i++){
				mvModels[i] = mvModels[i].trim().toUpperCase();
			}
			tempSpeech +='<table><tr><td></td>'
			for(var i=0;i<mvModels.length;i++){
				tempSpeech += '<td>'+mvModels[i]+"</td>";
			}
			tempSpeech+="</tr><tr><td>Name</td>";
			for(var i=0;i<mvModels.length;i++){
				tempSpeech += '<td>'+getFeature(mVtype,mvModels[i],'name').result + '</td>';
			}
			tempSpeech+="</tr><tr><td>Price</td> ";
			for(var i=0;i<mvModels.length;i++){
				tempSpeech += '<td>'+getFeature(mVtype,mvModels[i],'price').result+ '</td>';
			}
			tempSpeech+="</tr><tr><td>Warranty </td>";
			for(var i=0;i<mvModels.length;i++){
				tempSpeech += '<td>'+getFeature(mVtype,mvModels[i],'warranty').result+ '</td>';
			}
			tempSpeech+="</tr><tr><td>Rating </td>";
			for(var i=0;i<mvModels.length;i++){
				tempSpeech += '<td>'+getFeature(mVtype,mvModels[i],'rating').result+ '</td>';
			}
			tempSpeech+="</tr><tr><td>Features </td>";
			for(var i=0;i<mvModels.length;i++){
				tempSpeech += '<td>'+getFeature(mVtype,mvModels[i],'features').result+ '</td>';
			}
			tempSpeech += '</tr></table>'
			console.log(tempSpeech);
			tempContext = {
				"name":"contextone",
				"parameters":{
					"devicetype":mVtype1
				}
			};
		finalResponse = {
					"speech":tempSpeech,
					"displayText":tempSpeech,
					"contextOut":[tempContext]
			}
			res.send(finalResponse);
		};
			
		
	});

// Get Request for/Modem 

app.get('/modem',function(req,res){
	res.write('<h1> Hello welcome to Net Gear');
});




					//Generic functions to get the details of modem......

	//Find the Best Item
function mFbest(item){
	var tempBestItem = 0;
	var tempBestNo = 100;
	for(var i = 0;i<item.length;i++){
		if(item[i].rating < tempBestNo){
			tempBestItem = i;
			tempBestNo = item[i].rating;
		}
	};
	return item[tempBestItem];
};

	//Find the Cheapest Item
function mFcheap(item){
	var tempCheapItem = 0;
	var tempPrice = 100000;
	for(var i = 0;i<item.length;i++){
		if(item[i].price < tempPrice){
			tempCheapItem = i;
			tempPrice = item[i].price;
		}
	};
	return item[tempCheapItem];
};

	// Find the one with highest Discount
function mFOffer(item){
	var tempOfferItem = 0;
	var tempOffer = 0;
	for(var i = 0;i<item.length;i++){
		if(item[i].discount > tempOffer){
			tempOfferItem = i;
			tempOffer = item[i].discount;
		}
	};
	return item[tempOfferItem];
};
	// Find the one with Highest Speed
function mFfast(item){
	var tempFastItem = 0;
	var tempSpeed = 0;
	for(var i = 0;i<item.length;i++){
		if(item[i].maxspeed > tempSpeed){
			tempFastItem = i;
			tempSpeed = item[i].maxspeed;
		}
	};
	return item[tempFastItem];
};

	// Find the device with the best match for the given GHZ band

function mFghz(item,ghz){
	var tempItem = 0;
	var tempGhz = 0;
	var tempGhzDiff = 100;

	for(var i=0;i<item.length;i++){
		for(var j=0;j<item[i].ghz.length;j++){

			
				// find the item with least difference
			if(ghz>item[i].ghz[j]){ //Alternative for taking mod of the Subtracted result, by finding the greater of two and then subtracting.
				if((ghz -item[i].ghz[j]) < tempGhz){
				tempItem = i;
					}
			}else{
				if((item[i].ghz[j]-ghz) < tempGhz){
				tempItem = i;
					}
			}

			tempGhz=item[i].ghz[j];
			tempGhzDiff = ghz - tempGhz;
			
			//  If we hit a jackpot with exact match
			if(tempGhzDiff==0){
				return {
					found:1,
					item:item[i]
				};
			}
		}
	}

	return{
		found:0,
		item:item[tempItem]
	}
}

	//Gets the Information of particular feature of the specific model of Correct type of Modem

function getFeature(item,model,feature){
	var result;
	console.log(model,feature);
	for(var i=0;i<item.length;i++){
		if (item[i].modelNo==model){
			result = item[i][feature];
			console.log('found the model'+result);
			return {
				"found":1,
				"result":result
			};
		}
	}
		console.log('coulcnt find the model no.');
		return {
			"found":0
		}
}
	// gets the Details of the particular Entity type 't' from item type 'item'
function getDetails(item,model,t){
	var tempRes ;
	switch(t){
		case 'price':
			tempRes = getFeature(item,model,'price');
			tempRes.speech = "The price of the product is " + tempRes.result;
			break;

		case 'model':
			tempRes = getFeature(item,model,'modelNo');
			tempRes.speech = "The Model No. of the product is " + tempRes.result;
			break;

		case 'warranty':
			tempRes = getFeature(item,model,'warranty');
			tempRes.speech = "This product has warranty for " + tempRes.result + 'years ';
			break;

		case 'release':
			tempRes = getFeature(item,model,'releaseDate');
			tempRes.speech = "This product was released to market on " + tempRes.result;
			break;

		case 'ghz':
			tempRes = getFeature(item,model,'ghz');
			tempRes.speech = "This product works on ";
			for (var i =0;i<tempRes.result.length;i++){
				if(i == (tempRes.result.length -1)){
					tempRes.speech = tempRes.speech + tempRes.result[i] +'Ghz';
				}else
				{
					tempRes.speech = tempRes.speech + tempRes.result[i] +'Ghz ,';
				}
			}
			break;

		case 'connect':
			
				tempRes = getFeature(item,model,'connectDevices');
				tempRes.speech= "This product can connect upto "+tempRes.result+" no. of devices";
			
			break;

		case 'cover':
			
				tempRes = getFeature(item,model,'coverage');
				tempRes.speech= "This product has coverage of "+tempRes.result+" Square meter.";
			
			break;

		case 'speed':
			tempRes = getFeature(item,model,'maxspeed');
			tempRes.speech= "This product has a max speed of "+tempRes.result;
			break;

		case 'discount':
			tempRes = getFeature(item,model,'discount');
			tempRes.speech= "This product has a discount of "+tempRes.result + '%';
			break;

		case 'rating':
			tempRes = getFeature(item,model,'rating');
			tempRes.speech= "This Rating for this product is ::  "+tempRes.result;
			break;

		case 'shipping':
			tempRes = getFeature(item,model,'shipping');
			if(tempRes.result>0){
				tempRes.speech= "This product has a shipping charges of  "+tempRes.result;
			}else{
				tempRes.speech= "This product does no shipping charges, Its absolutely free";
			}
			
			break;

		case 'special':
			tempRes = getFeature(item,model,'features');
			tempRes.speech= "This product have following features,, "+tempRes.result;
			break;

		case 'stock':
			tempRes = getFeature(item,model,'stock');
			tempRes.speech= "This product has "+tempRes.result+" Stocks available";
			break;

		case 'refund':
			tempRes = getFeature(item,model,'refund');
			tempRes.speech= tempRes.result;
			break;
		default :
			tempRes = {"found":0};
			break;

	}

	return tempRes;	
}