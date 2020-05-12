module.exports.create = (req, res, next) => {
    let errors = [];
    //Retrive information
    let { title, description, author, price } = req.body;

    // validate data in form
    if (!title || !description || !author || !price) {
        errors.push("Please fill out all fields");
    }

    //display errors for user
    if (errors.length > 0) {
        res.render('./book/create', { errors });
    } else {
        next();
    }
}