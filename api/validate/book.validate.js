module.exports.create = (req, res, next) => {
    let errors = [];
    //Retrive information
    let { title, description, author, price, image } = req.body;

    // validate data in form
    if (!title || !description || !author || !price || !image) {
        errors.push("Please fill out all fields");
    }

    //display errors for user
    if (errors.length > 0) {
        res.json(errors);
    } else {
        next();
    }
}