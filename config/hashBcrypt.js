const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_BCRYPT));
const hash = function(str) {
    return bcrypt.hashSync(str, salt);
}

module.exports = hash;