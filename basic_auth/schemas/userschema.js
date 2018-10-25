const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    passwordConf:{
        type: String,
        required: true
    }
});

//  BEFORE SAVING THE DATA
UserSchema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password,10,(err, hash)=>{
        if(err){
            return next(err);
        }
        user.password = hash;
        next();
    })
    
});

//ADDS User.authenticate

UserSchema.statics.authenticate = function (username, password, callback){
    User.findOne({username:username})
        .exec((err, user)=>{
            if(err){
                return callback(err);
            }else if(!user){
                var err =  'User not found!';
                err.status = 401;
                return callback(err);
            }

            bcrypt.compare(password, user.password, (err, result)=>{
                if(result === true){
                    return callback(null, user);
                }else{
                    return callback();
                }
            });
        });
    
};

const User = mongoose.model('User', UserSchema);

module.exports = User;