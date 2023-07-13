const express = require('express');
const router = express.Router({mergeParams: true});

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

const Campground = require('../models/campground');
const Review = require('../models/review');

const { campgroundSchema, reviewSchema} = require('../schemas');

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


//reviews

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


router.post('/', validateReview, async(req, res)=>{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'successfully Review added');
    res.redirect(`/campgrounds/${campground._id}`)
})

router.delete('/:reviewId', catchAsync(async(req, res)=>{
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull : { reviews : reviewId}});
    await Review.findByIdAndDelete(req.params.reviewId);
    // res.send('DELETE ME!!!');
    req.flash('success', 'successfully Review deleted');
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;