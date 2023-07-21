const express = require('express');
const router = express.Router({mergeParams: true});
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

const Campground = require('../models/campground');
const Review = require('../models/review');

const { campgroundSchema, reviewSchema} = require('../schemas');

router.post('/', isLoggedIn, validateReview, async(req, res)=>{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'successfully Review added');
    res.redirect(`/campgrounds/${campground._id}`)
})

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async(req, res)=>{
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull : { reviews : reviewId}});
    await Review.findByIdAndDelete(req.params.reviewId);
    // res.send('DELETE ME!!!');
    req.flash('success', 'successfully Review deleted');
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;