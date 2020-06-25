const Film = require('../lib/models/Film');
const { prepare, agent } = require('../db/data-helpers');
// two get routes for actors (get all actors, get actor by id) and post route to update actors

describe('ripe-bananas routes', () => {
  it('GETs all the Films', async() => {
    const films = prepare(await Film.find());

    return agent
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual(films);
      });
  });

  it('GETs a single film by id', async() => {
    const film = prepare(await Film.findOne());

    return agent
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual(film);
      });
  });

  
});
