var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.set('port', (process.env.PORT || 5000));

app.get('/webhook',function(req,res){
	res.write('<h1> In Webhook </h1>');
});

app.post('/webhook', function (req, res) {

    finalResponse = {
  "speech": "Today in Boston: Fair, the temperature is 37 F",
  "source": "apiai-weather-webhook-sample",
  "displayText": "Today in Boston: Fair, the temperature is 37 F"};
		res.status(200)
		res.send(finalResponse);
});

app.get('/',function(req,res){
	res.write('<h1>Home Page</h1>');
})


app.listen(app.get('port'),function(){
	console.log('Example app listening on port 5000')
})