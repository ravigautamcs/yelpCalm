const express = require('express');
const router = express.Router();
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controllers/campgrounds')
const { campgroundSchema, reviewSchema} = require('../schemas');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

router.get('/', catchAsync(campgrounds.index));

router.get('/new', isLoggedIn, campgrounds.new);

router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.newCamp));

router.get('/:id', catchAsync(campgrounds.show));

router.get('/:id/edit',  isLoggedIn, isAuthor, catchAsync(campgrounds.edit));

router.put('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.update));

router.delete('/:id', isLoggedIn, isAuthor, campgrounds.delete)


module.exports = router;