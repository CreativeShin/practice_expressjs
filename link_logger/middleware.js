
const Admin = require('./models/admin');

//MIDDLEWARES
function isLoggedIn(req, res, next){
    console.log('working');
    if(req.session && req.session.userId){
       next();
        }else{
            return res.send("error");
        }
}

module.exports = {
    isLoggedIn
}
