// two get routes for actors (get all actors, get actor by id) and post route to update actors
const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  .get('/', (req, res, next) => {
    Studio
      .find()
      .select({ 
        _id: true,
        name: true
      })
      .then(studios => res.send(studios))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .then(actor => res.send(actor))
      .catch(next);
  })
  .post('/', (req, res, next) => {
    Studio
      .create(req.body)
      .then(actor => res.send(actor))
      .catch(next);
  });
