require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

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

//index Hompage
app.get('/', (req, res) => {
    res.render('./index');
})

//user route
app.use('/user', require('./route/user.route'));

//connect to Cluster MongoDB Atlas
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
 .then( _ => console.log('Database connected!'))
 .then( _ => start(PORT))
 .catch(({message}) => console.log(message));

function start(PORT) {
    app.listen(PORT, () => { 
        console.log(`App is listening at ${PORT}`) 
    });
}