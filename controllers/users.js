const User = require('../models/user');
const flash = require('connect-flash')

module.exports.renderRegister = (req, res)=>{
    res.render('users/register')
}

module.exports.register = async(req, res, next)=>{
    // res.send(req.body);
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registerdUser = await User.register(user, password);
        req.login(registerdUser, err => {
            if(err) return next(err);
            req.flash('success', 'welcome to yelpcalm');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.loginRender = (req, res)=>{
    res.render('users/login');
}

module.exports.login = (req, res)=>{
    req.flash('success', 'welcome back!!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    // res.redirect('/campgrounds');
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res)=>{
    req.logout(function(err){
        if(err){
            return next(err);
        }
        req.flash('success', 'GoodByee!!');
        res.redirect('/campgrounds');
    });
}