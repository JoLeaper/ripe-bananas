const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .get('/', (req, res, next) => {
    Film
      .find()
      .select({ title: true, released: true, studio: true })
      .populate('studio', { name: true })
      .then(films => res.send(films))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .populate('studio', { name: true })
      .populate({ 
        path: 'cast.actor',
        select: 'name'  
      })
      .populate({
        path: 'reviews',
        select: {
          review: true,
          rating: true,
          reviewer: true
        },
        populate: {
          path: 'reviewer',
          select: 'name'
        }
      })
      .lean()
      .then(films => {
        films.reviews.forEach(film => {
          delete film.film;
        });
        return films;
      })
      .then(film => res.send(film))
      .catch(next);
  });
