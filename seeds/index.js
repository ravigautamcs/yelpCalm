const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');
const Campground = require('../models/campground');
const mongoose = require('mongoose');

const DB = 'mongodb+srv://ravi:ravi@cluster0.5mopirv.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB)
.then(()=>{
    console.log(`connection successfull with the database!!`);
})
.catch((e)=>{
    console.log(`sorry the connection is not successfull`);
    console.log(e);
});


const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async() =>{
    await Campground.deleteMany({});

    for(let i=0; i<50; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*1000) + 10;
        const camp = new Campground({
            author : '64b0f67b614fcc609e1e5f2d',
            location: `${cities[random1000].city} , ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://random.imagecdn.app/500/150',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nobis totam modi commodi quos libero vitae velit quisquam dolore minima.',
            price
        })

        await camp.save();
    }
};

seedDB().then(()=>{
    mongoose.connection.close();
});