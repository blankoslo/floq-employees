var express = require('express')
var app = express()

app.use(express.static('public'));

app.get('/*', function (req, res) {
    res.redirect(307, 'http://localhost:8081' + req.path);
});


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Employees frontend app listening at http://%s:%s', host, port);

})
