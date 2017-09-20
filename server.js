var express = require('express');
var exphbs  = require('express-handlebars');
var mongoUtil = require('./util/mongo');

/* express server configs */
var app = express();
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

// express routes
app.use('/', require('./routes/home'));
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));

/*
 * start web-server after successful mongodb conn
*/
mongoUtil.connectToServer(function( err ) {
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log('App now running on port', port);
  });
});
