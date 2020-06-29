const Film = require('../lib/models/Film');
const { prepare, agent } = require('../db/data-helpers');
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
      }));

    return agent
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual(film);
      });
  });

  
});
