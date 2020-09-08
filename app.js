let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let diaryRouter = require("./routers/diaryRouter");
let serverless = require('serverless-http');

// Body parser
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-control-Allow-Origin', 'http://localhost:3000');
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// MongoDB
let endpoint = 'mongodb+srv://admin:admin@cluster0.jdlmg.mongodb.net/deardiary?retryWrites=true&w=majority';
if(process.env.NODE_ENV == 'dev'){
  endpoint = 'mongodb://localhost/deardiary';
}
mongoose.connect(endpoint, { useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
if(!db)
    console.log("DB not connected. Please ensure mongodb is started by running `mongod`.");

// Routers
app.use('/api/diary', diaryRouter);

var port = process.env.PORT || 8080;
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running server on port " + port);
});

module.exports = app;
module.exports.handler = serverless(app);
