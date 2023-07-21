const express = require('express');
const router = express.Router({mergeParams: true});
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

const reviews = require('../controllers/reviews');


router.post('/', isLoggedIn, validateReview, reviews.newReview);

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.delete))

module.exports = router;