const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const { prepare, agent } = require('../db/data-helpers');


describe('ripe-bananas routes', () => {
  it('GETs all the reviews', async() => {
    const reviews = prepare(await Review.find());

    return agent
      .get('/api/v1/reviews')
      .then(res => {
        expect(res.body).toEqual(reviews);
      });
  });
  it('POSTs the review', async() => {
    const reviewer = await Reviewer.findOne();
    const film = await Film.findOne();

    return agent
      .post('/api/v1/reviews/')
      .send({
        rating: '2',
        review: 'was okay but also shit',
        reviewer: reviewer.id,
        film: film.id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          rating: '2',
          review: 'was okay but also shit',
          reviewer: reviewer.id,
          film: film.id,
          __v:0

        });
      });
    
  });
});
