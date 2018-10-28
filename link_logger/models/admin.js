const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
});



adminSchema.pre('save', function (next) {
    var admin = this;
    bcrypt.hash(admin.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        admin.password = hash;
        next();
    });
});

adminSchema.statics.authenticate = function (username, password, callback) {
    Admin.findOne({ username })
        .exec((err, admin) => {
            if(err){
                return callback(err);
            }else if(!admin){
                var err = new Error('Admin not found!');
                err.status(401);
                return callback(err);
            }

            bcrypt.compare(password, admin.password, (err, result)=>{
                if(result === true){
                    return callback(null, admin);
                }
                return callback();
            })
        });
}

//  ORDER MATTERS !!
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;