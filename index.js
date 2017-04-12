
var express = require("express");
var path = require('path');
var app = express();



pdtls = require('./server/projectdtls');


app.get('/pstatus', pdtls.getprojectstatus);



port = process.env.PORT || 8080;

app.listen(port);
