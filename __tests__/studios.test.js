const Studio = require('../lib/models/Studio');
const { prepare, agent } = require('../db/data-helpers');
// two get routes for actors (get all actors, get actor by id) and post route to update actors

describe('ripe-bananas routes', () => {
  it.only('GETs all the actors', async() => {
    const studios = prepare(await Studio.find());

    return agent
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toEqual(studios);
      });
  });

  it('GETs a single actor by id', async() => {
    const studio = prepare(await Studio.findOne());

    return agent
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual(studio);
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
