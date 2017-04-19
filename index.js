var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Metascraper = require('metascraper');

app.set('port', (process.env.PORT || 5000));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.end('Metadata scraper');
});

app.post('/', function(request, response) {
  var url = request.body.url;
  
  Metascraper.scrapeUrl(url)
    .then((metadata) => {
      response.json(metadata);
    })
    .catch((error) => console.log(error));
});
  
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});