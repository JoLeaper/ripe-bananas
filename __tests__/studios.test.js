const Studio = require('../lib/models/Studio');
const { prepare, agent } = require('../db/data-helpers');
// two get routes for actors (get all actors, get actor by id) and post route to update actors

describe('ripe-bananas studio routes', () => {
  it('GETs all the studios', async() => {
    const studios = prepare(await Studio.find().select({ _id: true, name: true }));

    return agent
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toEqual(studios);
      });
  });

  it('GETs a single studios by id', async() => {
    const studio = prepare(await Studio.findOne().populate('films', { title: true, studio: true }));

    return agent
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual(studio);
      });

  });

  it('POSTs a new studio and information', async() => {

    return agent
      .post('/api/v1/studios/')
      .send({
        name: 'Universal Studios',  
        address: {
          city: 'Orlando',
          state: 'FL',
          country: 'US'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'Universal Studios',  
          address: {
            city: 'Orlando',
            state: 'FL',
            country: 'US'
          }
        });
      });
  });
});
