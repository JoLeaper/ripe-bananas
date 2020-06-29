// two get routes for actors (get all actors, get actor by id) and post route to update actors
const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .populate({
        path: 'reviews',
        select: { _id: true, film: true, rating: true, review: true },
        populate: {
          path: 'film',
          select: 'title'
        }
      })
      .lean()
      .then(reviewer => {
        reviewer.reviews.forEach(review => {
          delete review.reviewer;
        });
        return reviewer;
      })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(
        { _id: req.params.id },
        { name: req.body.name }, 
        { new: true })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });
