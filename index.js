let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let diaryRouter = require("./routers/diaryRouter");

// Body parser
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

// MongoDB
mongoose.connect('mongodb://localhost/deardiary', { useNewUrlParser: true, useUnifiedTopology: true});
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
