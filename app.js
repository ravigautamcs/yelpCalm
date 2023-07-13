const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash')
const { redirect } = require('express/lib/response');
const { error } = require('console');



const campgroundRoute = require('./routes/campgrounds');
const reviewRoute = require('./routes/reviews');

const DB = 'mongodb+srv://ravi:ravi@cluster0.5mopirv.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB)
.then(()=>{
    console.log(`connection successfull with the database!!`);
})
.catch((e)=>{
    console.log(`sorry the connection is not successfull`);
    console.log(e);
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret : 'thisshouldbeabettersecret',
    resave : false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}
app.use(session(sessionConfig))
app.use(flash())

//flash
app.use((req, res, next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//Router
app.use('/campgrounds', campgroundRoute);
app.use('/campgrounds/:id/reviews', reviewRoute);

app.get('/', (req, res) => {
    res.render('home')
});

app.all('*', (req, res, next)=>{
    // res.send("404!!!")
    next(new ExpressError('page not found', 404))
})

app.use((err, req, res, next)=>{
    const {statusCode=500} = err;
    if(!err.message) err.message = 'something went wrong!!!';
    res.status(statusCode).render('error', {err});
})

app.listen(3000, ()=>{
    console.log('serving on port 3000');
})