const Campground = require('../models/campground');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}

module.exports.new = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.newCamp = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'successfully created new campground');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.show = async (req, res,) => {
    const campground = await Campground.findById(req.params.id).populate({
        path : 'reviews',
        populate:{
            path: "author"
        }
    }).populate('author');
    // console.log(campground);
    if(!campground){
        req.flash('error', 'Unable to find that Campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

module.exports.edit = async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground){
        req.flash('error', 'Cannot find the campgrounds');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.update = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'successfully updated campground');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'successfully Deleted campground');
    res.redirect('/campgrounds');
}