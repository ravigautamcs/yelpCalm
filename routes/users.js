const express = require('express');
const router = express.Router();
const flash = require('connect-flash')
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');


router.get('/register', (req, res)=>{
    res.render('users/register')
})

router.post('/register', catchAsync(async(req, res)=>{
    // res.send(req.body);
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registerdUser = await User.register(user, password);
        console.log(registerdUser);
        req.flash('success', 'welcome to yelpcalm');
        res.redirect('/campgrounds');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}))

router.get('/login', (req, res)=>{
    res.render('users/login');
})

router.post('/login', passport.authenticate('local', {failureFlash : true, failureRedirect : '/login'}), (req, res)=>{
    req.flash('success', 'welcome back!!');
    res.redirect('/campgrounds');
})

router.get('/logout', (req, res)=>{
    req.logout(function(err){
        if(err){
            return next(err);
        }
        req.flash('success', 'GoodByee!!');
        res.redirect('/campgrounds');
    });
});

module.exports = router;