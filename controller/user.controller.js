const User = require('../model/user.model');
const hash = require('../config/hashBcrypt');
const uploadCloudinary = require('../config/uploadCloudinary');

//create user
module.exports.create = (req, res) => {
    res.render('user/create');
}

module.exports.postCreate = async (req, res) => {
    let {name, phone, email} = req.body;
    
    //hash password by bcryptjs
    let password = hash(req.body.password);
    
    // upload to server-side
    // let avatar = req.file.path.split('\\').slice(1).join('\\');

    //upload to cloudinary through server-side
    let avatar = req.file && await uploadCloudinary(req.file.path);
    
    //create user
    let user = new User({name, phone, email, password, avatar});

    user.save()
     .then( _ => console.log('data saved'))
     .catch(({message}) => console.log(message));
     
    res.send('User created!');
}