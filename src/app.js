const path = require('path');

const express = require('express');
// to work with partials, load in hbs
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(path.join(__dirname, '../public/'));
// console.log(__filename);

const app = express();

/* we use the 'get' method on express() to route routes / urls
'req' argument is an object that contains information about the incoming request from the client to this server
res' argument is an object that contains a bunch of method which allows us to customize the response that we wanna send back to the client that initiated the request. */

// serve up the directory of static files
// app.use() is used to customize our express server

// the public directory that the web server exposes to the browser
// DEFINE PATH FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// app.set() allow us to set a value for a given express setting
// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('view engine', 'hbs');
app.set('views', viewsPath);
// tell handle bars (hbs) where we wanna put our partials
hbs.registerPartials(partialsPath);

// SETUP STATIC DIRECTORY TO SERVE.
app.use(express.static(publicDirectoryPath));

/* app.get('', (req, res) => {

  // We describe here what we wanna do when someone visits this route or url
  // This function describes what we wanna send back to them
  // console.log(req);
  res.send('<h1>Weather</h1>');

}); */

// app.get('/help', (req, res) => {

//   // Do this when someone visits '/help'
//   res.send({
//     name: 'AbdulRazaq Suleiman',
//     age: 24,
//     occupation: 'Developer'
//   });

// });

// app.get('/about', (req, res) => {

//   res.send('<h1>About page</h1>')

// });

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    message: 'Welcome to HandleBars',
    name: 'AbdulRazaq Suleiman'
  });

});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    message: 'About Me',
    name: 'AbdulRazaq Suleiman'
  })

});

app.get('/help', (req, res) => {

  res.render('help', {
    title: 'Help page',
    message: 'Hello, welcome to the help page',
    name: 'AbdulRazaq Suleiman'
  })

});

/////// WEATHER ENDPOINT ///////

app.get('/weather', (req, res) => {

  const address = req.query.address;

  if (!address) {
    return res.send({ error: 'No address was provided!' });
  }

  // set an empty object default value to the destructure arguments if bad address is passed and there is an error or no data was provided
  geocode(address, (error, { latitude, longitude, country, state, continent } = {}) => {

    if (error) res.send({ error });

    forecast(latitude, longitude, (error, forecastData) => {

      if (error) return res.send({ error });

      const jsonData = {
        forecast: forecastData,
        address,
        country,
        state,
        continent
      }

      res.send(jsonData);

    });

  });

});


// Practicing search queries
app.get('/products', (req, res) => {

  if (!req.query.search) {
    // immediately exit the function so that http response isn't sent twice
    return res.send({ error: 'You must provide a search term' });
  }

  console.log(req.query);
  res.send({
    products: []
  });

});


app.get('/help/*', (req, res) => {

  res.render('404', { 
    title: 'Error: 404',
    errorMessage: 'Help article not found',
    name: 'AbdulRazaq Suleiman'
  });

});

app.get('*', (req, res) => {

  res.render('404', { 
    title: 'Error: 404',
    errorMessage: 'Page not found',
    name: 'AbdulRazaq Suleiman'
  });

});

// Start the server up
app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
