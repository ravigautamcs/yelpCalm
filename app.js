const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

const DB = 'mongodb+srv://ravi:ravi@cluster0.ctqjq.mongodb.net/yelpcalm?retryWrites=true&w=majority';

mongoose.connect(DB)
.then(()=>{
    console.log(`connection successfull with the database!!`);
})
.catch((e)=>{
    console.log(`sorry the connection is not successfull`);
    console.log(e);
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res)=>{
    res.render('home');
})

// app.get('/makecampground', async (req, res)=>{
//     const camp = new Campground( {title: 'My BackYard', description: 'camping at affordable price!!'});
//     await camp.save();
//     res.send(camp);
// })

app.get('/campgrounds', async (req, res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
})


app.listen(3000, ()=>{
    console.log('serving on port 3000');
})