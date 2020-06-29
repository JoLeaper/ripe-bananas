const Film = require('../lib/models/Film');
const { prepare, agent } = require('../db/data-helpers');
const reviewers = require('../lib/routes/reviewers');
// two get routes for actors (get all actors, get actor by id) and post route to update actors

describe('ripe-bananas routes', () => {
  it('GETs all the Films', async() => {
    const films = prepare(await Film.find().select({ title: true, released: true, studio: true }).populate('studio', { name: true }));
    return agent
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual(films);
      });
  });

  it('GETs a single film by id', async() => {
    const film = prepare(await Film.findOne()
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
      }));

    return agent
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual(film);
      });
  });

  
});
