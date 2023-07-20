module.exports.isLoggedIn = (req, res, next)=>{
    // console.log("REQ.USER...", req.user);
    if(!req.isAuthenticated()){

        //store the url currently on 
        req.session.returnTo = req.originalUrl; 
        req.flash('error' , 'you must be singed in to access this');
        res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

