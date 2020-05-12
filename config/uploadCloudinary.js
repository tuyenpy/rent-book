const cloudinary = require('cloudinary').v2;

cloudinary.config();

function uploadCloudinary(path, folder) {
    return new Promise((res, rej) => {
        cloudinary.uploader.upload(path, {folder: folder}, (err, result) => {
            if (err) throw err;
            res(result.secure_url);
        });
    });
}

module.exports = uploadCloudinary;