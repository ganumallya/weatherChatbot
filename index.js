var express = require('express');
var app = express();
var server = require('http').createServer(app);



app.get('/webhook', function (req, res) {
    res.write('<h1>Hello</h1>')
})


app.listen(3000,function(){
	console.log('Example app listening on port 3000')
})