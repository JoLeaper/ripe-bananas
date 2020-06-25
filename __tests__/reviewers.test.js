const Reviewer = require('../lib/models/Reviewer');
const { prepare, agent } = require('../db/data-helpers');
// two get routes for actors (get all actors, get actor by id) and post route to update actors

describe('ripe-bananas routes', () => {
  it('GETs all the reviewers', async() => {
    const reviewers = prepare(await Reviewer.find());

    return agent
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual(reviewers);
      });
  });

  it('GETs a single reviewer by id', async() => {
    const reviewer = prepare(await Reviewer.findOne());

    return agent
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewer);
      });

  });

  it('POSTs a new reviewer and information', async() => {

    return agent
      .post('/api/v1/reviewers/')
      .send({
        name: 'John Jones',
        company: 'Jones Inc'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'John Jones',
          company: 'Jones Inc',
          __v:0

        });
      });
  });
});
