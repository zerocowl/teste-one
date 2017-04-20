var express = require('express');
var app = express();

app.use('/js', express.static(__dirname + '/front/js'));
app.use('/build', express.static(__dirname + '/../build'));
app.use('/css', express.static(__dirname + '/front/css'));
app.use('/images', express.static(__dirname + '/front/images'));
app.use('/pages', express.static(__dirname + '/front/pages'));

app.all('/*', function(req, res, next) {

    // Sends the index.html for other files to support HTML5Mode
    res.sendFile('/front/index.html', { root: __dirname });
});

var port = process.env.PORT || 8000;
app.listen(port);