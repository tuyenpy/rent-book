require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

//Pug - set template engine
app.set('view engine', 'pug');
app.set('views', './views');

//cookie-parser
app.use(cookieParser(process.env.COOKIE_SECRET));

//static folder
app.use(express.static('publics'));

//body-Parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.get('/', (req, res) => {
    res.render('./index');
});

//use route



app.listen(PORT, () => { console.log(`App is listening at ${PORT}`) });