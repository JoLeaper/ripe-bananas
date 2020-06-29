const Actor = require('../lib/models/Actor');
const { prepare, agent } = require('../db/data-helpers');
// two get routes for actors (get all actors, get actor by id) and post route to update actors

describe('ripe-bananas routes', () => {
  it('GETs all the actors', async() => {
    const actors = prepare(await Actor.find().select({ name: true }));

    return agent
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actors);
      });
  });

  it('GETs a single actor by id', async() => {
    const actor = prepare(await Actor.findOne());

    return agent
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual(actor);
      });

  });

  it('POSTs a new actor and information', async() => {

    return agent
      .post('/api/v1/actors/')
      .send({
        name: 'john Jones',
        dob: Date.now(),
        pob: 'seattle WA'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'john Jones',
          dob: expect.any(String),
          pob: 'seattle WA',
          __v:0

        });
      });
  });
});
