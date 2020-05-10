module.exports.create = (req, res, next) => {
    let errors = [];
    // name contains only characters a-zA-Z and max 5 char
    let nameValidate = /^([a-zA-Z]){3,5}$/ig;
    // phone contains onpy digit and max 10 char
    let phoneValidate = /^(\d){9,10}$/ig

    let { name, phone, email, password } = req.body;

    // validate data in form
    if (!name || !phone || !email || !password) {
        error = "Please fill out all fields";
        res.render('./user/create', { error });
    }
    //validate name, phone, password
    if (nameValidate.test(name) === false) {
        errors.push("name contains only characters a-zA-Z and min 3 char, max 5 char");
    }

    if (phoneValidate.test(phone) === false) {
        errors.push("phone contains onpy digit and min 9 and max 10 digit");  
    }

    //display errors for user
    if (errors.length > 0) {
        res.render('./user/create', {errors});
    } else {
        next();
    }
}