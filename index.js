var express = require('express'),
app = express(),
port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/build'));
app.listen(port);
console.log('Server start on ' + port + ' port');
