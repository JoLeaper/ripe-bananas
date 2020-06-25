const Actor = require('../lib/models/Actor');
const { prepare, agent } = require('../db/data-helpers');
// two get routes for actors (get all actors, get actor by id) and post route to update actors

describe('ripe-bananas routes', () => {
  it('GETs all the actors', async() => {
    const actors = prepare(await Actor.find());

    return agent
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actors);
      });
  });

  it.only('GETs a single actor by id', async() => {
    const actor = prepare(await Actor.findById());


    return agent
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual(actor);
      });

  });

  it('UPDATEs a specific actors information', () => {

  });
});
