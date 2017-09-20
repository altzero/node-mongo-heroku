var express = require('express');
var exphbs  = require('express-handlebars');
var sassMiddleware = require('node-sass-middleware');
var mongoUtil = require('./util/mongo');
var path = require('path');

/* express server configs */
var app = express();
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');
app.use(sassMiddleware({
  src: path.join(__dirname, 'assets/styles'),
  dest: path.join(__dirname, 'public/css'),
  // debug: true,
  outputStyle: 'compressed',
  prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="css/main.css"/>
}));

// note: sass-middleware must be init'd *before* `express.static` or else it will not work.
app.use('/public', express.static(path.join(__dirname, 'public')));
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
