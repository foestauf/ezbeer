const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const timeStamp = require('./routes/timestamp');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const passport = require("passport");
const users = require("./routes/users");

const APP_PORT = 4000;
const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})
);


// DB CONFIG
const db = process.env.MONGO_URI;

//Connect to Mongoose
mongoose.connect(
    db, { useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => console.log('MongoDB connection successful'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

app.get('/sayHello', function (req, res) {
    res.send('Hello from the back-end.');
});

app.use('/api/timestamp', timeStamp);

app.listen(APP_PORT);
console.log('Webserver listening to port', APP_PORT);
