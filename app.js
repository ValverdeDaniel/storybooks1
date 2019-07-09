const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

//load User Model
require('./models/User');

//passport config
require('./config/passport')(passport);

//load routes
const auth = require('./routes/auth');

//load keys file
const keys = require('./config/keys');

//map global promises
mongoose.Promise = global.Promise;

//mongoose connect
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const app = express();

app.get('/', (req, res) => {
  res.send('It Works!');
});

app.use(cookieParser());

//passport Middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(session())

//use routes
app.use('/auth', auth)

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});