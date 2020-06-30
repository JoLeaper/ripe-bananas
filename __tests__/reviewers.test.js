const Reviewer = require('../lib/models/Reviewer');
const { prepare, agent } = require('../db/data-helpers');
const { path } = require('../lib/app');
const reviews = require('../lib/routes/reviews');
const reviewers = require('../lib/routes/reviewers');
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
    const reviewer = prepare(await Reviewer.findOne()
      .populate({
        path: 'reviews',
        select: { _id: true, film: true, rating: true, review: true },
        populate: {
          path: 'film',
          select: 'title'
        }
      })
      .lean()
      .then(reviewer => {
        reviewer.reviews.forEach(review => {
          delete review.reviewer;
        });
        return reviewer;
      })
    );
    

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

        });
      });
  });

  
  it('PATCHes a single reviewer\'s name by id', async() => {
    const reviewer = prepare(await Reviewer.findOne());

    return agent
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ name: 'Frank Murphy' })
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          name: 'Frank Murphy'
        });
      });

  });
});
