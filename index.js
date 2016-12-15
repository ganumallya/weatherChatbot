var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.set('port', (process.env.PORT || 5000));

app.get('/webhook', function (req, res) {
    res.write('<h1>Hello</h1>');
});

app.get('/',function(req,res){
	res.write('<h1>Home Page</h1>');
})


app.listen(app.get('port'),function(){
	console.log('Example app listening on port 3000')
})