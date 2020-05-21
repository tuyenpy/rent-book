require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

//DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodify
mongoose.set('useFindAndModify', false);

//Pug - set template engine
app.set('view engine', 'pug');
app.set('views', './views');

//use CORS
app.use(cors());

//cookie-parser
app.use(cookieParser(process.env.COOKIE_SECRET));

//static folder
app.use(express.static('publics'));

//body-Parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Pass the user into each request
//This way. Poor performance, needs improvement in the future
app.use(findUser);

//render layout
app.get('/', (req, res) => {
    let user = res.locals.user;
    res.render('./layout', { user });
})
//hompage
app.get('/home', (req, res) => {
    res.render('./index');
})

//route
app.use('/user', require('./route/user.route'));
app.use('/book', require('./route/book.route'));
app.use('/cart', require('./route/cart.route'));
app.use('/transaction', require('./route/transaction.route'));
app.use('/document', require('./route/document.route'));

//route api
app.use('/api/book', require('./api/route/book.route'));
app.use('/api/post', require('./api/route/post.route'));




//connect to Cluster MongoDB Atlas
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(_ => console.log('Database connected!'))
    .then(_ => start(PORT))
    .catch(({ message }) => console.log(message));

function start(PORT) {
    app.listen(PORT, () => {
        console.log(`App is listening at ${PORT}`)
    });
}

//find user
async function findUser(req, res, next) {
    let userID = req.signedCookies.userID;
    //userID exist
    if (userID) {
        let User = await require('./model/user.model');
        let user = await User.findOne({ _id: userID });
        res.locals.user = user;
    }
    next();
}