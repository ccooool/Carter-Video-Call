const express = require('express');
const app = express();
const http = require('http').Server(app);
const socketio = require('socket.io');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.dev.js');
var bodyParser = require('body-parser');

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

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


const port = process.env.PORT || 8000;

// // remember to run webpack or this path wont find the files needed for the bundle
// app.use(express.static(path.resolve(__dirname, '../public/')))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('404 Error');
    err.status = 404;
    next(err);
});

// server error handle
app.use(function (req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
})

const server = app.listen(port, () => {
    console.log(`server and client are now running on ${port}`);
});

const io = socketio(server);

io.on('connection', function (socket) {
  console.log("client is connected " + socket.id)
  // receive the event, then send data to clients
  socket.on('userMessage', (data) => {
      io.sockets.emit("userMessage", data)
  })
  // receive the typing event, send out to clients
  socket.on('userTyping', (data) => {
      socket.broadcast.emit('userTyping', data)

  });
})