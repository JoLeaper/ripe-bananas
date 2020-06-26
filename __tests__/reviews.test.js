const Review = require('../lib/models/Review');
const { prepare, agent } = require('../db/data-helpers');


describe('ripe-bananas routes', () => {
  it.only('GETs all the reviews', async() => {
    const reviews = prepare(await Review.find());

    return agent
      .get('/api/v1/reviews')
      .then(res => {
        expect(res.body).toEqual(reviews);
      });
  });
});
