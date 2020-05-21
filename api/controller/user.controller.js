const User = require('../../model/user.model');
const { hash, comparePassword } = require('../../config/bcrypt');


//create user

module.exports.postCreate = async (req, res) => {
    console.log(req.body);
    let { name, phone, email, avatar } = req.body;

    //hash password by bcryptjs
    let password = hash(req.body.password);

    //create user
    let user = new User({ name, phone, email, password, avatar });

    user.save()
        .then()
        .catch(({ message }) => console.log(message));

    res.json(user);
}

//profile
module.exports.profile = (req, res) => {
    let user = res.locals.user;
    res.json(user);
}