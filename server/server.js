const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.dev.js');
const PORT = process.env.PORT || 3000;


// port setup and listening 
http.listen(PORT, () => {
    console.log("listening on port " + PORT)
});

// serving our index.html 
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

// allows files in this folder to be served all the time
app.use(express.static('public'));
if (process.env.NODE_ENV === 'development') {
  // Setup Webpack for development
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  // Static serve the dist/ folder in production
  app.use(express.static('dist'));
}