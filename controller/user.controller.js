const User = require('../model/User');
const hash = require('../config/hashBcrypt');

//create user
module.exports.create = (req, res) => {
    res.render('user/create');
}

module.exports.postCreate = async (req, res) => {
    let {name, phone, email} = req.body;
    let password = hash(req.body.password);// hash password
    let avatar = req.file.path.split('\\').slice(1).join('\\'); // uploads/users/...
    let user = new User({name, phone, email, password, avatar});
    await user.save()
     .then( _ => console.log('data saved'))
     .catch(({message}) => console.log(message));
     
    res.send('User created!');
}