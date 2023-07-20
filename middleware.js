module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.flash('error' , 'you must be singed in to access this');
        res.redirect('/login');
    }
    next();
}


